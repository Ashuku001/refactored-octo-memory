'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractiveTemplate extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveMessage, {foreignKey: "interactiveMesId", as: "template"})
      this.hasOne(models.ImageHeader, {foreignKey: "interactiveTemplateId", as: "tempImageHead"})
      this.hasOne(models.TextHeader, {foreignKey: "interactiveTemplateId", as: "tempTextHead"})
      this.belongsTo(models.Product, {foreignKey: "productId", as: "tempProduct"})
      this.hasOne(models.TemplateRepliedAction, {foreignKey: "interactiveTemplateId", as: "tempReply"})
      this.hasMany(models.TemplateReplyAction, {foreignKey: "interactiveTemplateId", as: "buttons"})
    }
  }
  InteractiveTemplate.init({
    interactiveMesId: DataTypes.INTEGER,
    header: DataTypes.ENUM(["TEXT", "IMAGE", "VIDEO", "DOCUMENT", "LOCATION"]),
    body: DataTypes.TEXT,
    footer: DataTypes.STRING,
    action: DataTypes.STRING,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'InteractiveTemplate',
  });
  return InteractiveTemplate;
};