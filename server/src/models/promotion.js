"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Product, {
        through: {model: 'PromotionProducts'}, 
        as: 'promotionProducts',
        foreignKey: 'promotionId',
        otherKey: 'productId'
      })

      this.belongsToMany(models.Customer, {
        through: {model: 'PromotionCustomers'}, 
        as: 'customerPromotions',
        foreignKey: 'customerId',
        otherKey: 'promotionId'
      })

      this.hasMany(models.Sale, {foreignKey: "promotionId", as: "salePromotions"})
      this.hasOne(models.Coupon, {foreignKey: "promotionId", as: "coupon"})
      this.belongsTo(models.Store, {foreignKey: "storeId", as: "storePromotions"})
    }
  }
  Promotion.init(
    {
      name: DataTypes.ENUM([
        "coupon",
        "free_gifts",
        "discount",
        "free_shipping",
        "upsell_special",
        "member_referral",
        "free_trial",
        "give_away",
        "bogo",
        "loyalty",
        "bundle",
        "tiered_discount",
        "subscription",
        "flash_sale",
        "competition",
        "donation",
        "cash_back",
      ]),
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      description: DataTypes.STRING,
      discountType: DataTypes.ENUM(["fixed", "percent"]),
      active: DataTypes.BOOLEAN,
      discountValue: DataTypes.DECIMAL,
      storeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Promotion",
    }
  );
  return Promotion;
};
