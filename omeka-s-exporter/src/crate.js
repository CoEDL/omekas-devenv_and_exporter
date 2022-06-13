import pkg from "lodash";
import { Item } from "./item.js";
const { compact } = pkg;

export class CrateBuilder {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
        this.graph = [
            {
                "@type": "CreativeWork",
                "@id": "ro-crate-metadata.json",
                conformsTo: { "@id": "https://w3id.org/ro/crate/1.1" },
                about: { "@id": "./" },
            },
        ];
        this.context = [];
        this.relatedItems = [];
    }

    async load({ rootDatasetId }) {
        let relatedItems;
        let item = new Item({ id: rootDatasetId, baseUrl: this.baseUrl, asRootDataset: true });
        ({ item, relatedItems } = await item.load());
        this.graph.push(item);
        let loaded = [rootDatasetId];
        let items = [];
        for (let item of relatedItems) {
            ({ items, loaded } = await this.loadRelatedItem({ items, item, loaded }));
        }
        items = compact(items).filter((item) => {
            const re = new RegExp(`${this.baseUrl}/items`);
            return item["@id"].match(re) ? null : item;
        });

        this.graph = [...this.graph, ...items];
    }

    async loadRelatedItem({ items, item, loaded }) {
        let relatedItems;
        if (!loaded.includes(item.omekaId) && !["Collection", "Dataset"].includes(item.type)) {
            item = new Item({ id: item.omekaId, baseUrl: this.baseUrl, asRootDataset: false });
            ({ item, relatedItems } = await item.load());
            loaded.push(item.omekaId);
            items.push(item);
            for (let item of relatedItems) {
                ({ item, loaded } = await this.loadRelatedItem({ items, item, loaded }));
                items.push(item);
            }
        }
        return { items, loaded };
    }

    export() {
        let crate = {
            "@context": "https://w3id.org/ro/crate/1.1/context",
            "@graph": this.graph,
        };
        return crate;
    }
}
