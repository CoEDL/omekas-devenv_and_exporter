export const configuration = {
    db: {
        username: "user",
        password: "password",
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        database: "omeka",
        logging: false,
    },

    awsConfig: {
        forcePathStyle: true,
        endpointUrl: "https://s3.nyingarn.net",
        awsAccessKeyId: "",
        awsSecretAccessKey: "",
        bucket: "",
        region: "us-east-1",
    },
    baseUrl: "http://catalog.cherokee.org",
    pathToFiles: "",
    entityTypesToExport: ["Dataset", "Collection", "Person"],
    typeToAtTypeMapping: {
        Dataset: ["Dataset", "RepositoryObject"],
        Collection: ["Dataset", "RepositoryCollection"],
    },
};
