import { models, sequelize, initConnection } from "./models/index.js";
import { db, awsCredentials, baseUrl } from "./configuration.js";
import { Items } from "./src/item.js";
import { getItemSet } from "./src/itemSet.js";

await initConnection({ db });
try {
    await sequelize.authenticate();
    // console.log("Connected to the db!");
    await exportItems({});
    // await exportItemSets();

    await sequelize.close();
} catch (error) {
    console.log(error);
    process.exit();
}

async function exportItems({ entityType = "Dataset" }) {
    const items = new Items({ entityType });
    await items.loadItems({ baseUrl });
}

// export async function exportItemSets() {
//     for (let itemSet of await models.item_set.findAll({ attributes: ["id"] })) {
//         let item = await getItemSet({ id: itemSet.id });
//     }
// }
