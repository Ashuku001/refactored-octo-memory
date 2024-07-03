"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Ads", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      merchantId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Merchants",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      templateId: {
        type: Sequelize.INTEGER,
        references: {
          model: "AdTemplates",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      read: {
        type: Sequelize.INTEGER,
      },
      delivered: {
        type: Sequelize.INTEGER,
      },
      sent: {
        type: Sequelize.INTEGER,
      },
      failed: {
        type: Sequelize.INTEGER,
      },
      response: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Ads");
  },
};
