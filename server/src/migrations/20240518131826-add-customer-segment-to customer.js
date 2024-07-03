'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Customers", "customerSegment", {
        type: Sequelize.ENUM(["corporate", "small", "middle", "individual"]),
      }),
      
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Customers', 'customerSegment')
  }
};
