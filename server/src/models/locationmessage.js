'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocationMessage extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Message, {foreignKey: "messageId", as: "location"})
    }
  }
  LocationMessage.init({
    address: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    messageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LocationMessage',
  });
  return LocationMessage;
};