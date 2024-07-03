"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageMessage extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Message, { foreignKey: "messageId", as: "image" });
    }
  }
  ImageMessage.init(
    {
      caption: DataTypes.TEXT,
      mimeType: DataTypes.STRING,
      sha256: DataTypes.STRING,
      url: DataTypes.STRING,
      imageId: DataTypes.STRING,
      AWbucketId: DataTypes.STRING,
      AWfileId: DataTypes.STRING,
      messageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ImageMessage",
    }
  );
  return ImageMessage;
};
