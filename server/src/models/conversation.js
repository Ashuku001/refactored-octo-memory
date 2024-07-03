'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Chat, {foreignKey: "chatId", as: "conversations"})
    }
  }
  Conversation.init({
    chatId: DataTypes.INTEGER,
    category: DataTypes.ENUM(["marketing", "utility", "service", "authentication"]),
    expiryDate: DataTypes.DATE,
    status: DataTypes.STRING,
    conversationId: DataTypes.STRING,
    pricingModel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};