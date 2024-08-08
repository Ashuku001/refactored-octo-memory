'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('Products', 'brandId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Brands', 
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' 
      });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Products', 'brandId')
  }
};
