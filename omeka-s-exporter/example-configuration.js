export const db = {
    username: "user",
    password: "password",
    host: "localhost",
    port: "3306",
    dialect: "mysql",
    database: "omeka",
    logging: false,
};

export const awsConfig = {
    forcePathStyle: true,
    endpointUrl: "http://localhost:10000",
    awsAccessKey: "root",
    awsSecretAccessKey: "rootpass",
    bucket: "repository",
    region: "us-east-1",
};

// the URL of the repository you intend to run
export const baseUrl = "http://catalog.cherokee.org";
