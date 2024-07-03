'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ButtonReplyActions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      interactiveButtonId: {
        type: Sequelize.INTEGER,
        references: {
          model: "InteractiveButtons",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      buttonId: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ButtonReplyActions');
  }
};