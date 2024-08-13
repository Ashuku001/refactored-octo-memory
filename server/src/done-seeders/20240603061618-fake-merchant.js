"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Merchants",
      [
        {
          id: 2,
          business_name: "Ashuku & Co",
          username: "test_merchant",
          password: "admin123",
          email: "@gmail.com",
          whatsapp_phone_number: "0707",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Merchants", null, {});
  },
};
