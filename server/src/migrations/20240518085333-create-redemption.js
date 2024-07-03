'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Redemptions', {
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
      rewardId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rewards",
          key: "id",
        },
        onDelete: "set null",
        onUpdate: "cascade",
      },
      redemptionDate: {
        type: Sequelize.DATE
      },
      pointsUsed: {
        type: Sequelize.INTEGER,
        validate: {
          isInt: true,
          min: 0
        }
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
    await queryInterface.dropTable('Redemptions');
  }
};