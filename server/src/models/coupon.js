'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Promotion, {foreignKey: "promotionId", as: "coupon"})
    }
  }
  Coupon.init({
    code: DataTypes.STRING,
    validFrom: DataTypes.DATE,
    validTo: DataTypes.DATE,
    discount: DataTypes.DECIMAL,
    active: DataTypes.BOOLEAN,
    promotionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};