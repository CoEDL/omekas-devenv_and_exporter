import { models, sequelize, initConnection } from "./models/index.js";
import { db, awsCredentials, baseUrl } from "./configuration.js";
import { CrateBuilder } from "./src/crate.js";

await initConnection({ db });
try {
    await sequelize.authenticate();
    // console.log("Connected to the db!");
    await exportItems({ entityType: "Dataset" });
    await exportItems({ entityType: "Collection" });

    await sequelize.close();
} catch (error) {
    console.log(error);
    process.exit();
}

async function exportItems({ entityType = "Dataset" }) {
    for (let item of await models.item.findAll({
        where: {
            "$id_resource.resource_class.local_name$": entityType,
        },
        include: [
            {
                model: models.resource,
                as: "id_resource",
                include: [{ model: models.resource_class, as: "resource_class" }],
            },
        ],
    })) {
        let crate = new CrateBuilder({ baseUrl });
        await crate.load({ rootDatasetId: item.id });
        crate = crate.export();
        console.log(JSON.stringify(crate, null, 2));
    }
}
