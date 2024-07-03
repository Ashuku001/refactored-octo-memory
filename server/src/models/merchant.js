'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Customer, {as: 'customers', foreignKey: "merchantId"});
      this.hasMany(models.Chat, { foreignKey: 'merchantId'});
      this.hasMany(models.Ad, { foreignKey: 'merchantId'});
      this.hasMany(models.AdTemplate, { foreignKey: 'merchantId'});
      this.hasOne(models.Setting, {foreignKey: 'merchantId'})
      this.hasMany(models.Message, {foreignKey: "merchantId"})
      this.hasMany(models.Store, {as: "merchatsStore", foreignKey: "merchantId"})
      this.hasMany(models.ScheduleTask, {foreignKey: 'merchantId', as: "merchantsTasks"})
    }
  }
  Merchant.init({
    business_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsapp_phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Merchant',
  });
  return Merchant;
};