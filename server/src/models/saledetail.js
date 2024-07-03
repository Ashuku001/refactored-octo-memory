'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleDetail extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: "productId", as: "productSales"})
      this.belongsTo(models.Sale, {foreignKey: "salesId", as: "saleDetails"})
    }
  }
  SaleDetail.init({
    salesId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    unitPrice: DataTypes.DECIMAL, 
    discount: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SaleDetail',
  });
  return SaleDetail;
};