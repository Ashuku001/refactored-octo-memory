'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Customers", "age", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn("Customers", "gender", {
        type: Sequelize.ENUM(["male", "female", "not_sure"])
      }),
      queryInterface.addColumn("Customers", "income", {
        type: Sequelize.ENUM(["high", "low", "medium"])
      }),

      queryInterface.addColumn("Customers", "occupation", {
        type: Sequelize.ENUM(["student", "employed", "self_employed"]),
      }),
      queryInterface.addColumn("Customers", "joinDate", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Customers", "lastPromoted", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("Customers", "status", {
        type: Sequelize.ENUM(["new", "high_rated", "medium_rated", "low_rated"]),
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Customers', 'age')
    queryInterface.removeColumn('Customers', 'gender')
    queryInterface.removeColumn('Customers', 'income')
    queryInterface.removeColumn('Customers', 'occupation')
    queryInterface.removeColumn('Customers', 'joinDate')
    queryInterface.removeColumn('Customers', 'lastPromoted')
    queryInterface.removeColumn('Customers', 'status')
  }
};
