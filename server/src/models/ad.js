"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    static associate(models) {
      this.belongsTo(models.Merchant, { foreignKey: "merchantId" });
      this.belongsTo(models.AdTemplate, {foreignKey: 'templateId'});
      this.hasMany(models.Message, {foreignKey: "adId", as: "messageAd"})
    }
  }
  Ad.init(
    {
      merchantId: DataTypes.INTEGER,
      templateId: DataTypes.INTEGER,
      read: DataTypes.INTEGER,
      delivered: DataTypes.INTEGER,
      sent: DataTypes.INTEGER,
      failed: DataTypes.INTEGER,
      response: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ad",
    }
  );
  return Ad;
};
