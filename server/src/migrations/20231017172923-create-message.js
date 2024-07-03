"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      messageId: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      from_customer: {
        type: Sequelize.BOOLEAN,
      },
      timestamp: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.STRING,
      },
      chatId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Chats",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      merchantId: {
        type: Sequelize.INTEGER,
        name: "fk_merchant_id",
        references: {
          model: "Merchants",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      customerId: {
        type: Sequelize.INTEGER,
        name: "fk_customer_id",
        references: {
          model: "Customers",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
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
    await queryInterface.dropTable("Messages");
  },
};
