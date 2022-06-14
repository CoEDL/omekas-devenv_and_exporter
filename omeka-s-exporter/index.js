import { models, sequelize, initConnection } from "./models/index.js";
import { configuration } from "./configuration.js";
import { CrateBuilder, Crate } from "./src/crate.js";
import { getS3Handle } from "./src/getS3Handle.js";
import path from "path";
import fsExtra from "fs-extra";
const { readdir, stat: fileStat } = fsExtra;

await initConnection({ db: configuration.db });
try {
    await sequelize.authenticate();
    // console.log("Connected to the db!");
    for (let entityType of configuration.entityTypesToExport) {
        await exportItems({ entityType });
    }

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
        let crate = new CrateBuilder({ baseUrl: configuration.baseUrl });
        await crate.load({ rootDatasetId: item.id });
        crate = crate.export();

        // TODO skip uploading unless newer than specified time and ready to upload

        let { bucket } = await getS3Handle({ configuration: configuration.awsConfig });

        crate = new Crate({ crate });
        const rootDataset = crate.getRootDataset();
        const identifier = rootDataset?.identifier.replace(configuration.baseUrl, "");
        console.log(`Exporting and uploading ${identifier} to S3`);

        await bucket.upload({
            target: path.join(identifier, "ro-crate-metadata.json"),
            json: crate,
        });
        console.log(rootDataset);
        if (rootDataset.hasPart) {
            for (let part of rootDataset.hasPart) {
                if (part["@type"] === "File") {
                    const targetImagePath = path.join(identifier, part["@id"]);
                    const localPath = path.join(
                        configuration.pathToFiles,
                        "original",
                        part.filename
                    );
                    let pathExists = await bucket.pathExists({ path: targetImagePath });
                    if (!pathExists) {
                        await bucket.upload({ target: targetImagePath, localPath });
                    } else {
                        let fileStatVersionInBucket = await bucket.stat({ path: targetImagePath });
                        let fileStatLocalCopy = await fileStat(localPath);
                        if (fileStatVersionInBucket.ContentLength !== fileStatLocalCopy.size) {
                            await bucket.upload({ target: targetImagePath, localPath });
                        }
                    }
                }
            }
        }
    }
}
