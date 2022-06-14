import { models } from "../models/index.js";
import pkg from "lodash";
const { groupBy, compact } = pkg;
import validator from "validator";
import { configuration } from "../configuration.js";

// export class Items {
//     constructor({ entityType }) {
//         if (!entityType) {
//             console.log(`'entityType' must be provided when instantiating 'Items'`);
//             return;
//         }
//         this.entityType = entityType;
//     }

//     async loadItems({ baseUrl }) {
//         if (!this.entityType) return;
//         for (let item of await models.item.findAll({
//             where: {
//                 "$id_resource.resource_class.local_name$": this.entityType,
//             },
//             include: [
//                 {
//                     model: models.resource,
//                     as: "id_resource",
//                     include: [{ model: models.resource_class, as: "resource_class" }],
//                 },
//             ],
//         })) {
//             // console.log(item);
//             let crate = new CrateBuilder({ baseUrl });
//             await crate.load({ rootDatasetId: item.id });
//             // crate = crate.export();
//             // console.log(JSON.stringify(crate, null, 2));
//         }
//     }
// }

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

        if (this.asRootDataset) {
            const type = configuration.typeToAtTypeMapping[
                item.id_resource.resource_class.local_name
            ] || ["Dataset", item.id_resource.resource_class.local_name];

            item = {
                ...this.rootDataset,
                "@type": type,
                name: item.id_resource.title,
                ...properties,
            };
        } else {
            let identifier = properties.identifier[0];
            item = {
                "@id": identifier,
                "@type": item.id_resource.resource_class.local_name,
                name: item.id_resource.title,
                ...properties,
            };
        }
        return { item, relatedItems: this.relatedItems };
    }

    // async getItem({ item }) {
    //     let resource = await item.getId_resource();

    //     // const media = await getMedia({ item });
    //     const owner = await getOwner({ resource });
    //     const resourceClass = await getResourceClass({ resource });
    //     const properties = await getProperties({ resource });
    //     const thumbnail = await getThumbnail({ resource });

    //     item = {
    //         id: item.id,
    //         title: resource.title,
    //         is_public: resource.is_public,
    //         resource_type: resource.resource_type,
    //         // media,
    //         owner,
    //         resourceClass,
    //         properties,
    //         thumbnail,
    //     };

    //     return item;
    // }

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
                    v.value = this.identifier({ className: "collections", identifier: v.value });
                } else if (resource.resource_class.local_name === "Dataset") {
                    v.value = this.identifier({ className: "items", identifier: v.value });
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
                    valueResource = await this.getRelatedMedia({ id: valueResource.id });
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
        properties = groupBy(properties, "local_name");
        Object.keys(properties).forEach((property) => {
            properties[property] = properties[property].map((entry) =>
                entry.resource ? entry.resource : entry.value
            );
            if (properties[property].length === 1) properties[property] = properties[property][0];
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
        if (validator.isURL(identifier)) {
            return identifier;
        } else {
            identifier = identifier.replace(/\s/g, "_");
            if (className === "items" || className === "Dataset") {
                return `${this.baseUrl}/items/${identifier}`;
            } else if (className === "collections" || className === "Collection") {
                return `${this.baseUrl}/collections/${identifier}`;
            } else {
                return `${this.baseUrl}/${className}/#${identifier}`;
            }
        }
    }
}
