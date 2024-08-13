'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeSetting extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId", as: "stripe"})
    }
  }
  StripeSetting.init({
    api_key: DataTypes.STRING,
    webhook_secret: DataTypes.STRING,
    callback_url: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StripeSetting',
  });
  return StripeSetting;
};