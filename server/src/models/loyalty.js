'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loyalty extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer,  {foreignKey: "customerId", as: "customerLoyalty"})
    }
  }
  Loyalty.init({
    customerId: DataTypes.INTEGER,
    pointsBalance: DataTypes.INTEGER,
    lastUpdated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Loyalty',
  });
  return Loyalty;
};