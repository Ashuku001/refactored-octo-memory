'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListSection extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveList, {foreignKey: "interactiveListId", as: "sections"})
      this.hasMany(models.ListRowButton, {foreignKey: "listSectionId", as: "rows"})
    }
  }
  ListSection.init({
    interactiveListId: DataTypes.INTEGER,
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ListSection',
  });
  return ListSection;
};