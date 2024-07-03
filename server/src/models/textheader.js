'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TextHeader extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveButton, {foreignKey: "interactiveButtonId", as: "btnTextHead"})
      this.belongsTo(models.InteractiveList, {foreignKey: "interactiveListId", as: "listTextHead"})
      this.belongsTo(models.InteractiveTemplate, {foreignKey: "interactiveTemplateId", as: "tempTextHead"})
    }
  }
  TextHeader.init({
    interactiveButtonId: DataTypes.INTEGER,
    interactiveListId: DataTypes.INTEGER,
    interactiveTemplateId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TextHeader',
  });
  return TextHeader;
};