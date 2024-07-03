"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InteractiveTemplates", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      interactiveMesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "InteractiveMessages",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
          onDelete: "null",
          onUpdate: "cascade",
        },
      },
      header: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
      },
      footer: {
        type: Sequelize.STRING,
      },
      action: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("InteractiveTemplates");
  },
};
