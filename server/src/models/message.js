'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Chat, {foreignKey: "chatId"})

      // Different message types
      this.hasOne(models.TextMessage, {foreignKey: "messageId", as: 'text'})
      this.hasOne(models.ImageMessage, {foreignKey: "messageId", as: 'image'})
      this.hasOne(models.LocationMessage, {foreignKey: "messageId", as: 'location'})
      this.hasOne(models.VideoMessage, {foreignKey: "messageId", as: 'video'})
      this.hasOne(models.DocumentMessage, {foreignKey: "messageId", as: 'document'})
      this.hasOne(models.InteractiveMessage, {foreignKey: "messageId", as: 'interactive'})
      this.hasOne(models.ButtonRepliedAction, {foreignKey: "messageId", as: 'mesBtnReply'})
      this.hasOne(models.ListRepliedAction, {foreignKey: "messageId", as: 'mesListReply'})
      this.hasOne(models.TemplateRepliedAction, {foreignKey: "messageId", as: 'mesTempReply'})

      // bulk messaging and campaign
      this.belongsTo(models.Ad, {foreignKey: "adId", as: "messageAd"})
      this.hasOne(models.MarketingResponse, {foreignKey: "messageId", as: "mesTempLead"})
      this.hasOne(models.AdTemplate, {foreignKey: "messageId", as: "adTempMessage"})

      // context messge
      this.hasMany(models.Message, {foreignKey: "contextId", as: 'contexts'})
      this.belongsTo(models.Message, {foreignKey: "contextId", as: 'context'})

      // might have to remove this columns
      this.belongsTo(models.Merchant, {foreignKey: "merchantId"})
      this.belongsTo(models.Customer, {foreignKey: "customerId"})
    }
  }
  Message.init({
    from_customer: DataTypes.BOOLEAN,
    timestamp: DataTypes.DATE,
    type: DataTypes.ENUM(["TEXT", "VIDEO", "IMAGE", "DOCUMENT", "LOCATION", "LOCATION", "INTERACTIVE", "BUTTON_REPLY", "LIST_REPLY", "TEMPLATE_REPLY"]),
    isAd: DataTypes.BOOLEAN,
    chatId: DataTypes.INTEGER,
    adId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER,
    hasContext: DataTypes.BOOLEAN,
    contextId: DataTypes.INTEGER,
    messageId: DataTypes.STRING, // from whatsapp messageId to be used to change status of the message
    status: DataTypes.ENUM(["read", "delivered", "sent"])
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};