'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId"})
      this.hasMany(models.Product, {foreignKey: "sizeId"})
    }
  }
  Size.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};