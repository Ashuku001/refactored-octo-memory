'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ButtonReplyAction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveButton, {foreignKey: "interactiveButtonId", as: "buttons"})
    }
  }
  ButtonReplyAction.init({
    interactiveButtonId: DataTypes.INTEGER,
    buttonId: DataTypes.STRING,
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ButtonReplyAction',
  });
  return ButtonReplyAction;
};