'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListRepliedAction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.ListRowButton, {foreignKey: "listRowButtonId", as: "listReply"})
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "mesListReply"})
    }
  }
  ListRepliedAction.init({
    listRowButtonId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    buttonId: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListRepliedAction',
  });
  return ListRepliedAction;
};