'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Redemption,  {foreignKey: "rewardId", as: "rewardRedemptions"})
    }
  }
  Reward.init({
    rewardName: DataTypes.STRING,
    pointsRequired: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Reward',
  });
  return Reward;
};