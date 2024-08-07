'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MpesaSetting extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId", as: "mpesa"})
    }
  }
  MpesaSetting.init({
    consumer_key: DataTypes.STRING,
    consumer_secret: DataTypes.STRING,
    pass_key: DataTypes.STRING,
    business_shortcode: DataTypes.STRING,
    account_reference: DataTypes.STRING,
    transaction_desc: DataTypes.STRING,
    callback_url: DataTypes.STRING,
    storeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MpesaSetting',
  });
  return MpesaSetting;
};