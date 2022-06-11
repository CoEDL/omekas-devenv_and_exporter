import { models } from "../models/index.js";

export async function getItemSet({ id }) {
    let item = await models.item_set.findOne({ where: { id }, attributes: ["id"] });
    let resources = await item.getItem_id_items();
    // console.log(Object.getPrototypeOf(item));
    // console.log(resources);
    if (resources.length) {
        item = await getItem({ item: resources[0] });
        console.log(item);
    }
}
