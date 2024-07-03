'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ImageMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caption: {
        type: Sequelize.TEXT
      },
      mimeType: {
        type: Sequelize.STRING
      },
      sha256: {
        type: Sequelize.STRING
      },
      imageId: {
        type: Sequelize.STRING
      },
      AWbucketId: {
        type: Sequelize.STRING
      },
      AWfileId: {
        type: Sequelize.STRING,
        unique: true,
      },
      url: {
        type: Sequelize.STRING,
      },
      messageId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Messages",
          key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('ImageMessages');
  }
};