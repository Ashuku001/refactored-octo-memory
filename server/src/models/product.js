'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId"})
      this.belongsTo(models.Category, {foreignKey: "categoryId"})
      this.hasMany(models.Image, {foreignKey: "productId", as: "images"})

      this.hasOne(models.OrderItem, {foreignKey: 'productId', as: 'orderProduct'})
      
      this.hasMany(models.InteractiveButton, {foreignKey: "productId", as: "product"})
      this.hasMany(models.InteractiveTemplate, {foreignKey: "productId", as: "tempProduct"})
      this.hasMany(models.ListRowButton, {foreignKey: "productId", as: "listProduct"})
      this.hasMany(models.MarketingResponse, {foreignKey: "productId", as: "productLead"})
      this.hasMany(models.AdTemplate, {foreignKey: "productId", as: "adTempProduct"})
      this.belongsTo(models.Brand, {foreignKey: "brandId",  as: "brand"})

      // #################### PRODUCT #####################
      this.hasMany(models.ProductVariation, {foreignKey: "productId", as: "prodVariations"})
      this.hasMany(models.ProductCombination, {foreignKey: "productId", as: "prodCombinations"})

      this.belongsToMany(models.Promotion, {
        through: {model: 'PromotionProducts'}, 
        as: 'promotionProducts',
        foreignKey: 'promotionId',
        otherKey: 'productId'
      })

      this.hasMany(models.SaleDetail, {foreignKey: "productId", as: "productSales"})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    brandId: DataTypes.INTEGER,
    stockCode: DataTypes.STRING,
    isFeatured: DataTypes.BOOLEAN,
    isArchived: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};