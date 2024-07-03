// ######################
// binding our model to sequelize
// database connection is set up in a separate file from loading the models
const Sequelize = require("sequelize");
require("dotenv").config()

// load this when in develpment
if (process.env.NODE_ENV === "development") {
  require("babel-plugin-require-context-hook/register")();
}


const models = (sequelize) => {
  let db = {};
  
  // for all files ending with .js in this folder load them i.e. all the models in this folder load them apart from index.js
  const context = require.context(".", true, /^\.\/(?!index\.js).*\.js$/, "sync");
  
  // loop through all the files that have been loaded check if 
  context.keys().map(context).forEach(module => {
    const model = module(sequelize, Sequelize);
    db[model.name] = model;
  })
   
  // for each model check if they have a function called associate if so execute
  // tje associate() and through this we establish relationships btwn multiple models
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  
  return db
}


if (exports) {
  exports.db = models
}