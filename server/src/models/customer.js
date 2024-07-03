'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association her
      this.belongsTo(models.Merchant, {foreignKey: "merchantId"});
      this.hasOne(models.Chat, {foreignKey: "customerId"})
      this.hasMany(models.Message, {foreignKey: "customerId"})
      //
      this.hasOne(models.MarketingResponse, {foreignKey: "customerId", as: "customerLead"})
      // Shopping
      this.hasMany(models.Order,  {foreignKey: "customerId", as: "customerOrder"})

      this.hasOne(models.Loyalty,  {foreignKey: "customerId", as: "customerLoyalty"})
      this.hasMany(models.Purchase, {foreignKey: "customerId", as: "customerPurchases"})
      this.hasMany(models.Redemption, {foreignKey: "customerId", as: "customerRedemptions"})

      this.belongsToMany(models.Promotion, {
        through: {model: 'PromotionCustomers'}, 
        as: 'customerPromotions',
        foreignKey: 'customerId',
        otherKey: 'promotionId'
      })


      this.hasMany(models.Sale, {foreignKey: "customerId", as: "customerSales"})

    }
  }
  Customer.init({
    whatsapp_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    loc_name: DataTypes.STRING,
    loc_address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    loc_latitude: DataTypes.STRING,
    loc_longitude: DataTypes.STRING,
    loc_url: DataTypes.STRING,
    merchantId: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM(["male", "female", "not_sure"]),
    income: DataTypes.ENUM(["high", "low", "middle"]),
    customerSegment: DataTypes.ENUM(["corporate", "small", "middle", "individual"]),
    occupation: DataTypes.ENUM(["student", "employed", "self_employed"]),
    joinDate: DataTypes.DATE,
    lastPromoted: DataTypes.DATE,
    status: DataTypes.ENUM(["new", "high_rated", "medium_rated", "low_rated"])

  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};