'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemplateRepliedAction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveTemplate, {foreignKey: "interactiveTemplateId", as: "tempReply"})
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "mesTempReply"})
    }
  }
  TemplateRepliedAction.init({
    messageId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    payload: DataTypes.STRING,
    interactiveTemplateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TemplateRepliedAction',
  });
  return TemplateRepliedAction;
};