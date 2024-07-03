'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, {foreignKey: "customerId", as: "customerSales"})
      this.belongsTo(models.Promotion, {foreignKey: "promotionId", as: "salePromotions"})
      this.hasMany(models.SaleDetail, {foreignKey: "salesId", as: "saleDetails"})
      this.belongsTo(models.Store, {foreignKey: "storeId", as: "storeSales"})
    }
  }
  Sale.init({
    customerId: DataTypes.INTEGER,
    saleDate: DataTypes.DATE,
    invoiceNo: DataTypes.STRING,
    storeId: DataTypes.INTEGER,
    promotionId: DataTypes.INTEGER,
    totalAmount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};