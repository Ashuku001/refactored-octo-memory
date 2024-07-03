'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariation extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: "productId", as: "prodVariations"})
      this.hasMany(models.ProductVariationOption, {foreignKey: "productVariationId", as: "prodVarOptions"})
    }
  }
  ProductVariation.init({
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductVariation',
  });
  return ProductVariation;
};