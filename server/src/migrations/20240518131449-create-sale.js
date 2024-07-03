'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
        onDelete: "set null",
        onUpdate: "cascade",
      },
      saleDate: {
        type: Sequelize.DATE
      },
      invoiceNo: {
        type: Sequelize.STRING
      },
      promotionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Promotions",
          key: "id",
        },
        onDelete: "set null",
        onUpdate: "cascade",
      },
      storeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stores",
          key: "id",
        },
        onDelete: "set null",
        onUpdate: "cascade",
      },
      totalAmount: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Sales');
  }
};