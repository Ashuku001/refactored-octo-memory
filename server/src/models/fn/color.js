'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId"})
      this.hasMany(models.Product, {foreignKey: "colorId"})
    }
  }
  Color.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};