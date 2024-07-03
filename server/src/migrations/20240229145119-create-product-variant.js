'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductVariants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productCombinationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ProductCombinations",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      productVariationOptionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ProductVariationOptions",
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
    await queryInterface.dropTable('ProductVariants');
  }
};