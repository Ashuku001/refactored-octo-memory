"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // return Promise.all([
      await queryInterface.addColumn("ProductCombinations", "combinationString", {
        type: Sequelize.TEXT,
      })
    // ]);
  },

  async down(queryInterface, Sequelize) {
    // return Promise.all([
      await queryInterface.removeColumn('ProductCombinations', 'combinationString')
      // ]);
  }
};
