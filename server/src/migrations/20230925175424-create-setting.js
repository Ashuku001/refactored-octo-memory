'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      app_id: {
        type: Sequelize.STRING
      },
      app_secret: {
        type: Sequelize.STRING
      },
      phone_number_id: {
        type: Sequelize.STRING
      },
      business_account_id: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      api_version: {
        type: Sequelize.STRING
      },
      webhook_verification_token: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      callBack_url: {
        type: Sequelize.STRING,
        unique: true,
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
    await queryInterface.dropTable('Settings');
  }
};