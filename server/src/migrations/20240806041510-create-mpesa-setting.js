'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MpesaSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      consumer_key: {
        type: Sequelize.STRING
      },
      consumer_secret: {
        type: Sequelize.STRING
      },
      pass_key: {
        type: Sequelize.STRING
      },
      business_shortcode: {
        type: Sequelize.STRING
      },
      account_reference: {
        type: Sequelize.STRING
      },
      transaction_desc: {
        type: Sequelize.STRING
      },
      callback_url: {
        type: Sequelize.STRING
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stores",
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
    await queryInterface.dropTable('MpesaSettings');
  }
};