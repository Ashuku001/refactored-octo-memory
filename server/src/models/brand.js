'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, {foreignKey: "storeId"})
      this.hasMany(models.Product, {foreignKey: "brandId", as: "brand"})
    }
  }
  Brand.init({
    name: DataTypes.STRING,
    joinDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    industry: DataTypes.STRING,
    loc_name: DataTypes.STRING,
    loc_address: DataTypes.STRING,
    loc_latitude: DataTypes.STRING,
    loc_longitude: DataTypes.STRING,
    loc_url: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};