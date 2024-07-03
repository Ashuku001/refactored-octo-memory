'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Billboard extends Model {
    static associate(models) {
      this.belongsTo(models.Store, {foreignKey: "storeId"})
      this.hasMany(models.Category, {foreignKey: "billboardId"})
    }
  }
  Billboard.init({
    storeId: DataTypes.INTEGER,
    label: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Billboard',
  });
  return Billboard;
};