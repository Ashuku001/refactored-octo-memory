'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentMessage extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "document"})
    }
  }
  DocumentMessage.init({
    caption: DataTypes.TEXT,
    mimeType: DataTypes.STRING,
    sha256: DataTypes.STRING,
    filename: DataTypes.STRING,
    url: DataTypes.STRING,
    documentId: DataTypes.STRING,
    messageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DocumentMessage',
  });
  return DocumentMessage;
};