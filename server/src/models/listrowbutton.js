'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListRowButton extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.ListSection, {foreignKey: "listSectionId", as: "rows"})
      this.belongsTo(models.Product, {foreignKey: "productId", as: "product"})
      this.hasOne(models.ListRepliedAction, {foreignKey: "listRowButtonId", as: "listReply"})
    }
  }
  ListRowButton.init({
    listSectionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    buttonId: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListRowButton',
  });
  return ListRowButton;
};