import { models, sequelize, initConnection } from "./models/index.js";
import { db, awsConfig, baseUrl } from "./configuration.js";
import { CrateBuilder, Crate } from "./src/crate.js";
import { getS3Handle } from "./src/getS3Handle.js";
import path from "path";

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

        let { bucket } = await getS3Handle({ configuration: awsConfig });

        crate = new Crate({ crate });
        const rootDataset = crate.getRootDataset();
        const identifier = rootDataset?.identifier.replace(baseUrl, "");

        await bucket.upload({
            target: path.join(identifier, "ro-crate-metadata.json"),
            json: crate,
        });
        // console.log(bucket);
    }
}
