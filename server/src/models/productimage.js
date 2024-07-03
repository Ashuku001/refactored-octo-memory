'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.ProductCombination, {foreignKey: "productCombinationId", as: "variantImage"})
    }
  }
  ProductImage.init({
    link: DataTypes.STRING,
    productCombinationId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  return ProductImage;
};