'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: 'storeId', as: 'storeOrder'})
      this.hasMany(models.OrderItem, {foreignKey: 'orderId', as: "orderItems", onUpdate: "CASCADE"})
      this.belongsTo(models.Customer, {foreignKey: "customerId", as: "customerOrder"})
    }
  }
  Order.init({
    isPaid: DataTypes.BOOLEAN,
    orderID: DataTypes.STRING,
    status: DataTypes.ENUM(["CONFIRMED", "PENDING", "RECEIVED"]),
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    storeId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};