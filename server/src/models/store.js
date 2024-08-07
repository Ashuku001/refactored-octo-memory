'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      this.belongsTo(models.Merchant, {foreignKey: "merchantId"})
      this.hasMany(models.Billboard, {foreignKey: "storeId"})
      this.hasMany(models.Category, {foreignKey: "storeId"})
      this.hasMany(models.Product, {foreignKey: "storeId"})
      this.hasMany(models.Order, {foreignKey: "storeId", as: 'storeOrder'})
      this.hasMany(models.Promotion, {foreignKey: "storeId", as: "storePromotions"})
      this.hasMany(models.PromotionProduct, {foreignKey: "storeId", as: 'promotionProducts'})
      this.hasMany(models.PromotionCustomer, {foreignKey: "storeId", as: 'promotionCustomers'})
      this.hasMany(models.Sale, {foreignKey: "storeId", as: "storeSales"})
      this.hasMany(models.Brand, {foreignKey: "storeId"})
      this.hasOne(models.MpesaSetting, {foreignKey: "storeId", as: "mpesa"})
    }
  }
  Store.init({
    name: DataTypes.STRING,
    merchantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};