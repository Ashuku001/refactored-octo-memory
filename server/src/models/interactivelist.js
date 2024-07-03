'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractiveList extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveMessage, {foreignKey: "interactiveMesId", as: "list"})
      this.hasMany(models.ListSection, {foreignKey: "interactiveListId", as: "sections"})
      this.hasOne(models.TextHeader, {foreignKey: "interactiveListId", as: "listTextHead"})
    }
  }
  InteractiveList.init({
    interactiveMesId: DataTypes.INTEGER,
    header: DataTypes.ENUM(["TEXT"]),
    body: DataTypes.TEXT,
    footer: DataTypes.STRING,
    button: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'InteractiveList',
  });
  return InteractiveList;
};