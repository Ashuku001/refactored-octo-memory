'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketingResponse extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Customer, {foreignKey: "customerId", as: "cusTempLead"})
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "mesTempLead"})
      this.belongsTo(models.Product, {foreignKey: "productId", as: "prodTempLead"})
      this.belongsTo(models.AdTemplate, {foreignKey: "adTemplateId", as: "adTempResponses"})
    }
  }
  MarketingResponse.init({
    customerId: DataTypes.INTEGER,
    adTemplateId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MarketingResponse',
  });
  return MarketingResponse;
};