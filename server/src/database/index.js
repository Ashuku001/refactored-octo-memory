const { Sequelize } = require("sequelize");
const configFile = require("../config/index.js");
let models = require("../models/index.js");


// get the database which contains all the models from require.context
models = models.db;
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// establish a connection to the postgress database
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config 
);

// db object with the models and sequelize properties
const db = {
  models: models(sequelize), // bind the models with sequelize
  sequelize,
};

// export the database object with all models in models folder bound to sequelize
// and the sequelize instance that connects to the database
if (exports) {
  exports.db = db;
  exports.sequelize = sequelize;
}
