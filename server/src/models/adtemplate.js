'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdTemplate extends Model {
    static associate(models) {
      this.belongsTo(models.Merchant, {foreignKey: "merchantId"})
      this.hasMany(models.Ad, {foreignKey: "templateId", as: 'ads'})

      this.hasMany(models.MarketingResponse, {foreignKey: "adTemplateId", as: "adTempResponses"})
      this.belongsTo(models.Product, {foreignKey: "productId", as: "adTempProduct"})
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "adTempMessage"})
    }
  }
  AdTemplate.init({
    merchantId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    leads: DataTypes.INTEGER,
    // adId: DataTypes.INTEGER
    messageId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'AdTemplate',
  });
  return AdTemplate;
};