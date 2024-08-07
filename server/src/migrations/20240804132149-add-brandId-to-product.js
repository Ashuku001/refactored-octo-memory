'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("Products", "brandId", {
      type: Sequelize.INTEGER,
    }),

    queryInterface.addConstraint("Products", {
      fields: ["brandId"],
      type: "foreign key",
      name: "fk_brand_id",
      references: {
        table: "Brands",
        field: "id",
      },
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Products', 'brandId')
  }
};
