import { models } from "../models/index.js";
import pkg from "lodash";
const { groupBy } = pkg;
import validator from "validator";

export class Items {
    constructor({ entityType }) {
        if (!entityType) {
            console.log(`'entityType' must be provided when instantiating 'Items'`);
            return;
        }
        this.entityType = entityType;
    }

    async loadItems({ baseUrl }) {
        if (!this.entityType) return;
        for (let item of await models.item.findAll({
            where: {
                "$id_resource.resource_class.local_name$": this.entityType,
            },
            include: [
                {
                    model: models.resource,
                    as: "id_resource",
                    include: [{ model: models.resource_class, as: "resource_class" }],
                },
            ],
        })) {
            item = new Item({ item, baseUrl });
            await item.load();
            // item.exportCrate();
        }
    }
}

class Item {
    constructor({ item, baseUrl }) {
        this.item = item;
        this.baseUrl = baseUrl;
        this.graph = [];
        this.conext = [];
        this.rootDataset = {
            "@id": "./",
            "@type": "Dataset",
        };
        this.relatedItems = [];
    }

    async load() {
        let properties = await this.getProperties({ resource: this.item.id_resource });

        let rootDataset = {
            ...this.rootDataset,
            name: this.item.id_resource.title,
            ...properties,
        };
        console.log(JSON.stringify(rootDataset, null, 2));
        console.log(this.relatedItems);
    }

    exportCrate() {
        let crate = {
            "@context": [],
            "@graph": [this.rootDataset],
        };
        this.rootDataset.name = this.item.id_resource.title;
        console.log(JSON.stringify(crate, null, 2));
    }

    async getItem({ item, depth = 0 }) {
        if (depth > 1) return;
        let resource = await item.getId_resource();

        // const media = await getMedia({ item });
        const owner = await getOwner({ resource });
        const resourceClass = await getResourceClass({ resource });
        const properties = await getProperties({ resource, depth });
        const thumbnail = await getThumbnail({ resource });

        item = {
            id: item.id,
            title: resource.title,
            is_public: resource.is_public,
            resource_type: resource.resource_type,
            // media,
            owner,
            resourceClass,
            properties,
            thumbnail,
        };

        return item;
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
                v.value = `${this.baseUrl}/Item/${v.value.replace(/\s/g, "_")}`;
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
            let resource;
            if (valueResource) {
                if (valueResource?.resource_type === "Omeka\\Entity\\Media") {
                    resource = await this.getRelatedMedia({ id: valueResource.id });
                } else if (valueResource?.resource_type === "Omeka\\Entity\\Item") {
                    resource = await this.getRelatedItem({ id: valueResource.id });
                }

                // attributes = ["label", "prefix", "comment", "namespace_uri"];
                // let vocab = await property.getVocabulary({ attributes });

                let p = {
                    ...property.get(),
                    // vocab: vocab.get(),
                    // annotation: annotation?.get(),
                    resource,
                };
                properties.push(p);
            }
        }
        properties = groupBy(properties, "local_name");
        Object.keys(properties).forEach((property) => {
            properties[property] = properties[property].map((entry) =>
                entry.resource ? entry.resource : entry.value
            );
        });
        delete properties.title;
        return properties;
    }

    async getThumbnail({ resource }) {
        return await resource.getThumbnail();
    }

    async getRelatedItem({ id }) {
        let item = await models.item.findOne({
            where: { id },
            include: [
                {
                    model: models.resource,
                    as: "id_resource",
                    include: [{ model: models.resource_class, as: "resource_class" }],
                },
            ],
        });
        const resource = item.id_resource;
        const resourceClass = await resource.getResource_class();
        const properties = await resource.getValues({
            include: [{ model: models.property, as: "property" }],
        });
        let idProperty = properties.filter((p) => {
            return p.property.local_name === "identifier";
        })[0];

        let reference = {
            omekaId: item.id,
            type: resourceClass.local_name,
            value: {
                "@id": this.getId(resourceClass.local_name, idProperty.value),
            },
        };
        this.relatedItems.push(reference);

        return reference.value;
    }

    async getRelatedMedia({ id }) {
        let media = await models.media.findOne({ where: { id } });
        media = media.get();

        let m = {
            "@id": media.source,
            "@type": "File",
            contentSize: media.size,
            encodingFormat: media.media_type,
            ingester: media.ingester,
            sha256: media.sha256,
            filename: `${media.storage_id}.${media.extension}`,
            alterName: media.alt_text,
            inLanguage: media.lang,
        };
        // console.log(JSON.stringify(m, null, 2));
        return m;
    }

    getId(className, value) {
        if (validator.isURL(value)) {
            return value;
        } else {
            value = value.replace(/\s/g, "_");
            return `${this.baseUrl}/${className}/#${value}`;
        }
    }
}
