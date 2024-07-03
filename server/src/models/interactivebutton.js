'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractiveButton extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveMessage, {foreignKey: "interactiveMesId", as: "button"})
      this.hasOne(models.ImageHeader, {foreignKey: "interactiveButtonId", as: "btnImageHead"})
      this.hasOne(models.TextHeader, {foreignKey: "interactiveButtonId", as: "btnTextHead"})
      this.hasMany(models.ButtonReplyAction, {foreignKey: "interactiveButtonId", as: "buttons"})
      this.hasOne(models.ButtonRepliedAction, {foreignKey: "interactiveButtonId", as: "buttonReply"})
      this.belongsTo(models.Product, {foreignKey: "productId", as: "product"})
    }
  }
  InteractiveButton.init({
    interactiveMesId: DataTypes.INTEGER,
    header: DataTypes.ENUM(["TEXT", "IMAGE", "VIDEO", "DOCUMENT"]),
    body: DataTypes.TEXT,
    action: DataTypes.ENUM(["BUTTON_REPLY"]),
    productId: DataTypes.INTEGER,
    footer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InteractiveButton',
  });
  return InteractiveButton;
};