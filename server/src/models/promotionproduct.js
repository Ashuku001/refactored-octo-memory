'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromotionProduct extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId", as: 'promotionProducts'})
    }
  }
  PromotionProduct.init({
    promotionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PromotionProduct',
  });
  return PromotionProduct;
};