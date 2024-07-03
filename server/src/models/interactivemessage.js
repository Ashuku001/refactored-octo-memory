'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InteractiveMessage extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "interactive"})
      this.hasOne(models.InteractiveButton, {foreignKey: "interactiveMesId", as: 'button'})
      this.hasOne(models.InteractiveList, {foreignKey: "interactiveMesId", as: 'list'})
      this.hasOne(models.InteractiveTemplate, {foreignKey: "interactiveMesId", as: 'template'})
    }
  }
  InteractiveMessage.init({
    messageId: DataTypes.INTEGER,
    type: DataTypes.ENUM(["BUTTON", "LIST", "TEMPLATE"])
  }, {
    sequelize,
    modelName: 'InteractiveMessage',
  });
  return InteractiveMessage;
};