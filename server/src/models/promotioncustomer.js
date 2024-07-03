'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PromotionCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.PromotionCustomer, {foreignKey: "storeId", as: 'promotionCustomers'})
    }
  }
  PromotionCustomer.init({
    customerId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    redemptionDate: DataTypes.DATE,
    reedemed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PromotionCustomer',
  });
  return PromotionCustomer;
};