"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await Promise.all([
      await queryInterface.addColumn("Messages", "hasContext", {
        type: Sequelize.BOOLEAN,
      })
      
      await queryInterface.addColumn("Messages", "contextId", {
        type: Sequelize.INTEGER,
      })
    // ])

    // await Promise.all([
      await queryInterface.addConstraint("Messages", {
        fields: ["contextId"],
        type: "foreign key",
        name: "fk_messageContext_id",
        references: {
          table: "Messages",
          field: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    // ])

  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Messages", "hasContext");
  },
};
