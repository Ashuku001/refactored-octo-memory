'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduleTask extends Model {
    static associate(models) {
      // define association here
      this.hasOne(models.BulkTemplateTask, {foreignKey: "scheduleTaskId", as: "bulkTempTask"})
      this.belongsTo(models.Merchant, {foreignKey: "merchantId", as: "merchantsTasks"})
    }
  }
  ScheduleTask.init({
    merchantId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    status: DataTypes.ENUM(['EXECUTED', 'PENDING', 'FAILED'])
  }, {
    sequelize,
    modelName: 'ScheduleTask',
  });
  return ScheduleTask;
};