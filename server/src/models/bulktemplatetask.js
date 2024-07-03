'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BulkTemplateTask extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.ScheduleTask, {foreignKey: "scheduleTaskId", as: "bulkTempTask"})
    }
  }
  BulkTemplateTask.init({
    scheduleTaskId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    template: DataTypes.TEXT,
    customers: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'BulkTemplateTask',
  });
  return BulkTemplateTask;
};