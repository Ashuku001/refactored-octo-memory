'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Products", "stockCode", {
        type: Sequelize.STRING,
      }),
      
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Products', 'stockCode')
  }
};
