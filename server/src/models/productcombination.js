'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCombination extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: "productId", as: "prodCombinations"})
      this.hasOne(models.ProductImage, {foreignKey: "productCombinationId", as: "variantImage"})
      this.belongsToMany(models.ProductVariationOption, {
        through: {model: 'ProductVariants'}, 
        as: 'productVariants',
        foreignKey: 'productCombinationId',
        otherKey: 'productVariationOptionId'
      })
    }
  }
  ProductCombination.init({
    price: DataTypes.FLOAT,
    productId: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    availableStock: DataTypes.STRING,
    combinationString: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ProductCombination',
  });
  return ProductCombination;
};