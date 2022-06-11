"use strict";

import Sequelize from "sequelize";
import initModels from "./init-models.js";
export let models = {};
export let sequelize;

export function initConnection({ db }) {
    let config = {
        db,
        pool: {
            max: 20,
            min: 10,
            acquire: 30000,
            idle: 10000,
        },
    };

    sequelize = new Sequelize(
        config.db.database,
        config.db.username,
        config.db.password,
        config.db
    );

    models = initModels(sequelize);
}
