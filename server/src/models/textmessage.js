'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TextMessage extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "text"})
    }
  }
  TextMessage.init({
    body: DataTypes.TEXT,
    messageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TextMessage',
  });
  return TextMessage;
};