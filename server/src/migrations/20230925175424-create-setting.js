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
      APP_ID: {
        type: Sequelize.STRING
      },
      APP_SECRET: {
        type: Sequelize.STRING
      },
      PHONE_NUMBER_ID: {
        type: Sequelize.STRING
      },
      BUSINESS_ACCOUNT_ID: {
        type: Sequelize.STRING
      },
      ACCESS_TOKEN: {
        type: Sequelize.STRING
      },
      API_VERSION: {
        type: Sequelize.STRING
      },
      WEBHOOK_VERIFICATION_TOKEN: {
        type: Sequelize.STRING
      },
      RECIPIENT_PHONE_NUMBER: {
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