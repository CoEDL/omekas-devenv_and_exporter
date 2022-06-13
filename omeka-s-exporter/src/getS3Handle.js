// import { loadConfiguration } from ".";
import { S3, Bucket } from "./s3.js";

export async function getS3Handle({ configuration }) {
    // const configuration = await loadConfiguration();

    let params = {
        bucket: configuration.bucket,
        accessKeyId: configuration.awsAccessKeyId,
        secretAccessKey: configuration.awsSecretAccessKey,
        region: configuration.region,
    };
    if (configuration.endpointUrl && configuration.forcePathStyle) {
        params.endpoint = configuration.endpointUrl;
        params.forcePathStyle = configuration.forcePathStyle;
    }
    let bucket = new Bucket(params);
    let s3 = new S3(params);
    return { s3, bucket };
}
