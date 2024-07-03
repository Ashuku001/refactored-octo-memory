'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, {foreignKey: "customerId", as: "customerPurchases"})
    }
  }
  Purchase.init({
    customerId: DataTypes.INTEGER,
    purchaseDate: DataTypes.DATE,
    totalAmount: DataTypes.DECIMAL,
    pointsEarned: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};