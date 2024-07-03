'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VideoMessage extends Model {
    static associate(models) {
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "video"})
    }
  }
  VideoMessage.init({
    caption: DataTypes.TEXT,
    mimeType: DataTypes.STRING,
    sha256: DataTypes.STRING,
    videoId: DataTypes.STRING,
    url: DataTypes.STRING,
    messageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VideoMessage',
  });
  return VideoMessage;
};