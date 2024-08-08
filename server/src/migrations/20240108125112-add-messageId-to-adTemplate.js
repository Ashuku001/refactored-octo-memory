'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn("AdTemplates", "messageId", {
        type: Sequelize.INTEGER,
      }),
      await queryInterface.addConstraint("AdTemplates", {
        fields: ["messageId"],
        type: "foreign key",
        name: "fk_message_id",
        references: {
          table: "Messages",
          field: "id",
        },
      })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('AdTemplates', 'messageId')
  }
};
