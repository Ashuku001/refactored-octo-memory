'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BulkTemplateTasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scheduleTaskId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ScheduleTasks",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      message: {
        type: Sequelize.TEXT
      },
      template: {
        type: Sequelize.TEXT
      },
      customers: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BulkTemplateTasks');
  }
};