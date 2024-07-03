"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Store, { foreignKey: "storeId" });
      this.belongsTo(models.Billboard, { foreignKey: "billboardId" });
      this.hasMany(models.Product, { foreignKey: "categoryId" });
    }
  }
  Category.init(
    {
      storeId: DataTypes.INTEGER,
      billboardId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
