'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {foreignKey: 'orderId', as: "orderItems", onUpdate: "CASCADE"})
      this.belongsTo(models.Product, {foreignKey: "productId", as: 'orderProduct'})
    }
  }
  OrderItem.init({
    orderId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};