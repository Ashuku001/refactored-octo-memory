'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      this.belongsTo(models.Merchant,{foreignKey: "merchantId"})
      this.belongsTo(models.Customer, {foreignKey: "customerId"})
      this.hasMany(models.Message, {foreignKey: "chatId", as: "messages"})
      this.hasMany(models.Conversation, {foreignKey: "chatId", as: "conversations"})
    }
  }
  Chat.init({
    merchantId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};