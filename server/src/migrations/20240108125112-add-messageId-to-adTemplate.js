'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("AdTemplates", "messageId", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addConstraint("AdTemplates", {
        fields: ["messageId"],
        type: "foreign key",
        name: "fk_message_id",
        references: {
          table: "Messages",
          field: "id",
        },
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('AdTemplates', 'messageId')
  }
};
