'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Customers", "loc_address", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Customers", "zipcode", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Customers", "loc_latitude", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Customers", "loc_longitude", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Customers", "loc_name", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Customers", "loc_url", {
        type: Sequelize.STRING,
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Customers', 'loc_address')
    queryInterface.removeColumn('Customers', 'zipcode')
    queryInterface.removeColumn('Customers', 'loc_latitude')
    queryInterface.removeColumn('Customers', 'loc_longitude')
    queryInterface.removeColumn('Customers', 'loc_name')
    queryInterface.removeColumn('Customers', 'loc_url')
  }
};
