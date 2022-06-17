// Database connection details. Only Mysql is supported.
export const db = {
    username: "user",
    password: "password",
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    database: "omeka",
    logging: false,
};

// AWS connection information
//   If using Minio or something like it set forcePathStyle: true and provide endpointUrl
//   If using real AWS S3 set forcePathStyle: false and don't provide endpointUrl
export const awsConfig = {
    forcePathStyle: true,
    endpointUrl: "https://s3.nyingarn.net",
    awsAccessKeyId: "",
    awsSecretAccessKey: "",
    bucket: "",
    region: "us-east-1",
};

// the domain of the data - this will prefix the data by the domain in the storage
export const domain = "catalog.cherokee.org";

// When exporting data, this baseUrl will be used for all links
export const baseUrl = "http://catalog.cherokee.org";

// The path to the omeka s datafiles. Ensure you provide a full path and if running
//   this inside a docker environment, then use the path inside where you mount the
//   files folder
export const pathToFiles = "";

// The entity types to be exported
export const entityTypesToExport = ["Dataset", "Collection", "Person"];

// If you want to confiugure the @type property of the root dataset per type
//   then define the mapping here.
export const typeToAtTypeMapping = {
    Dataset: ["Dataset", "RepositoryObject"],
    Collection: ["Dataset", "RepositoryCollection"],
};
