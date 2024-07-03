'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ButtonRepliedAction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveButton, {foreignKey: "interactiveButtonId", as: "buttonReply"})
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "mesBtnReply"})
    }
  }
  ButtonRepliedAction.init({
    interactiveButtonId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    buttonId: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ButtonRepliedAction',
  });
  return ButtonRepliedAction;
};