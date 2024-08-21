'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    static associate(models) {
      this.belongsTo(models.Merchant, { foreignKey: "merchantId"})
    }  
  }
  Setting.init({
    callBack_url: DataTypes.STRING,
    app_id: DataTypes.STRING,
    app_secret: DataTypes.STRING,
    phone_number_id: DataTypes.STRING,
    business_account_id: DataTypes.STRING,
    access_token: DataTypes.STRING,
    api_version: DataTypes.STRING,
    webhook_verification_token: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    merchantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
};