"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariationOption extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.ProductVariation, {
        foreignKey: "productVariationId",
        as: "prodVarOptions",
      });
      this.belongsToMany(models.ProductCombination, {
        through: { model: "ProductVariants" },
        as: "productVariants",
        foreignKey: "productCombinationId",
        otherKey: "productVariationOptionId",
      });
    }
  }
  ProductVariationOption.init(
    {
      value: DataTypes.STRING,
      productVariationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductVariationOption",
    }
  );
  return ProductVariationOption;
};
