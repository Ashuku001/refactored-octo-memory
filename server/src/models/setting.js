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
    APP_ID: DataTypes.STRING,
    APP_SECRET: DataTypes.STRING,
    PHONE_NUMBER_ID: DataTypes.STRING,
    BUSINESS_ACCOUNT_ID: DataTypes.STRING,
    ACCESS_TOKEN: DataTypes.STRING,
    API_VERSION: DataTypes.STRING,
    WEBHOOK_VERIFICATION_TOKEN: DataTypes.STRING,
    RECIPIENT_PHONE_NUMBER: DataTypes.STRING,
    merchantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
};