'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemplateReplyAction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.InteractiveTemplate, {foreignKey: "interactiveTemplateId", as: "buttons"})
    }
  }
  TemplateReplyAction.init({
    interactiveTemplateId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TemplateReplyAction',
  });
  return TemplateReplyAction;
};