'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Redemption extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Reward,  {foreignKey: "rewardId", as: "rewardRedemptions"})
      this.belongsTo(models.Customer, {foreignKey: "customerId", as: "customerRedemptions"})
    }
  }
  Redemption.init({
    customerId: DataTypes.INTEGER,
    rewardId: DataTypes.INTEGER,
    redemptionDate: DataTypes.DATE,
    pointsUsed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Redemption',
  });
  return Redemption;
};