import { models } from "../models/index.js";
import pkg from "lodash";
const { groupBy, isString, isNumber } = pkg;
import validator from "validator";
import * as configuration from "../configuration.js";

export class Item {
    constructor({ baseUrl, id, asRootDataset = false }) {
        this.id = id;
        this.baseUrl = baseUrl;
        this.asRootDataset = asRootDataset;
        this.rootDataset = {
            "@id": "./",
            "@type": "Dataset",
        };
        this.relatedItems = [];
    }

    async load() {
        let item = await models.item.findOne({
            where: {
                id: this.id,
            },
            include: [
                {
                    model: models.resource,
                    as: "id_resource",
                    include: [
                        { model: models.resource_class, as: "resource_class" },
                        { model: models.value, as: "values" },
                    ],
                },
            ],
        });
        let properties = await this.getProperties({ resource: item.id_resource });

        let repositoryIdentifier = this.getRepositoryIdentifier({
            resource: item.id_resource,
            properties,
        });
        if (!properties.identifier) properties.identifier = repositoryIdentifier;
        if (this.asRootDataset) {
            const type = configuration.typeToAtTypeMapping[
                item.id_resource.resource_class.local_name
            ] || ["Dataset", item.id_resource.resource_class.local_name];

            item = {
                ...this.rootDataset,
                "@type": type,
                repositoryIdentifier,
                name: item.id_resource.title,
                ...properties,
            };
        } else {
            let identifier = properties.identifier;
            item = {
                "@id": identifier,
                "@type": item.id_resource.resource_class.local_name,
                repositoryIdentifier,
                name: item.id_resource.title,
                ...properties,
            };
        }
        return { item, relatedItems: this.relatedItems };
    }

    async getOwner({ resource }) {
        let attributes = ["email", "name", "role", "is_active"];
        return (await resource.getOwner({ attributes })).get();
    }

    async getResourceClass({ resource }) {
        let attributes = ["label", "local_name", "comment", "vocabulary_id"];
        let resourceClass = await resource.getResource_class({ attributes });

        if (resourceClass) {
            attributes = ["label", "prefix", "comment", "namespace_uri"];
            let resourceClassVocab = await resourceClass.getVocabulary({ attributes });
            resourceClass = {
                ...resourceClass.get(),
                vocab: resourceClassVocab.get(),
            };
            return resourceClass;
        }
        return null;
    }

    async getProperties({ resource }) {
        let values = await resource.getValues();
        let properties = [];
        for (let v of values) {
            let attributes = ["local_name", "label", "comment", "vocabulary_id"];
            let property = await v.getProperty({ attributes });

            if (property.local_name === "identifier") {
                if (resource.resource_class.local_name === "Collection") {
                    v.value = this.identifier({ className: "collection", identifier: v.value });
                } else if (resource.resource_class.local_name === "Dataset") {
                    v.value = this.identifier({ className: "item", identifier: v.value });
                } else {
                    v.value = this.identifier({
                        className: resource.resource_class.local_name,
                        identifier: v.value,
                    });
                }
            }
            if (v.value) {
                properties.push({ ...property.get(), value: v.value });
                continue;
            }

            // let annotation = await v.getValue_annotation();
            // if (annotation) {
            //     annotation = await annotation.getId_resource();
            // }

            let valueResource = await v.getValue_resource();
            if (valueResource) {
                if (valueResource?.resource_type === "Omeka\\Entity\\Media") {
                    // valueResource = await this.getRelatedMedia({ id: valueResource.id });
                } else if (valueResource?.resource_type === "Omeka\\Entity\\Item") {
                    valueResource = await this.getRelatedItem({ id: valueResource.id });
                }

                let p = {
                    ...property.get(),
                    resource: valueResource,
                };
                properties.push(p);
            }
        }

        // add all attached media files
        properties = groupBy(properties, "local_name");

        Object.keys(properties).forEach((property) => {
            properties[property] = properties[property].map((entry) =>
                entry.resource ? entry.resource : entry.value
            );
            if (properties[property].length === 1) properties[property] = properties[property][0];
        });
        let { media } = await this.getAttachedMedia({ id: this.id });
        properties.hasPart = media;

        delete properties.title;
        return properties;
    }

    async getThumbnail({ resource }) {
        return await resource.getThumbnail();
    }

    async getRelatedItem({ id }) {
        let item = await models.item.findOne({
            where: { id },
            include: [{ model: models.resource, as: "id_resource" }],
        });
        const resource = item.id_resource;
        const resourceClass = await resource.getResource_class();
        let properties = await resource.getValues({
            include: [{ model: models.property, as: "property" }],
        });
        let reference = {
            omekaId: item.id,
            type: resourceClass.local_name,
            value: {
                "@id": this.getIdentifier({
                    properties,
                    title: resource.title,
                    className: resourceClass.local_name,
                }),
            },
        };
        this.relatedItems.push(reference);
        return reference.value;
    }

    // async getRelatedMedia({ id }) {
    //     let media = await models.media.findOne({ where: { id } });
    //     media = media.get();

    //     let m = {
    //         "@id": media.source,
    //         "@type": "File",
    //         contentSize: media.size,
    //         encodingFormat: media.media_type,
    //         ingester: media.ingester,
    //         sha256: media.sha256,
    //         filename: `${media.storage_id}.${media.extension}`,
    //         alterName: media.alt_text,
    //         inLanguage: media.lang,
    //     };
    //     return m;
    // }

    async getAttachedMedia({ id }) {
        let media = await models.media.findAll({ where: { item_id: id } });
        media = media.map((m) => {
            return {
                "@id": m.source,
                "@type": "File",
                contentSize: m.size,
                encodingFormat: m.media_type,
                ingester: m.ingester,
                sha256: m.sha256,
                filename: `${m.storage_id}.${m.extension}`,
                alterName: m.alt_text,
                inLanguage: m.lang,
            };
        });
        return { media };
    }

    getIdentifier({ properties, title, className }) {
        let identifier;
        let idProperty = properties.filter((p) => {
            return p.property.local_name === "identifier";
        });
        if (idProperty.length) {
            identifier = idProperty[0].value;
        } else {
            identifier = title;
        }
        return this.identifier({ className, identifier });
    }

    identifier({ className, identifier }) {
        if (isString(identifier) && validator.isURL(identifier)) {
            return identifier;
        } else {
            if (isString(identifier)) {
                identifier = identifier.replace(/\s/g, "_");
            } else if (isNumber(identifier)) {
                identifier = `${className}${identifier}`;
            }
            if (["item", "dataset"].includes(className.toLowerCase())) {
                return `${this.baseUrl}/item/${identifier}`;
            } else if (["collection"].includes(className.toLowerCase())) {
                return `${this.baseUrl}/collection/${identifier}`;
            } else {
                return `${this.baseUrl}/${className.toLowerCase()}/${identifier}`;
            }
        }
    }

    getRepositoryIdentifier({ resource, properties }) {
        const className = resource.resource_class.local_name;
        const name = resource.title;
        try {
            if (validator.isURL(properties.identifier)) {
                if (properties.identifier.match(configuration.baseUrl)) {
                    return properties.identifier;
                }
            }
        } catch (error) {
            return this.identifier({ className, identifier: resource.id });
        }
    }

    getProperty({ properties, name }) {
        return properties.filter((p) => p.local_name === name);
    }
}
