'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageHeader extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveButton, {foreignKey: "interactiveButtonId", as: "btnImageHead"})
      this.belongsTo(models.InteractiveTemplate, {foreignKey: "interactiveTemplateId", as: "tempImageHead"})
    }
  }
  ImageHeader.init({
    interactiveButtonId: DataTypes.INTEGER,
    interactiveTemplateId: DataTypes.INTEGER,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImageHeader',
  });
  return ImageHeader;
};