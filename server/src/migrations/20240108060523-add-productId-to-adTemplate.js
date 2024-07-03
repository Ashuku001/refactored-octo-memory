'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("AdTemplates", "productId", {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addConstraint("AdTemplates", {
        fields: ["productId"],
        type: "foreign key",
        name: "fk_product_id",
        references: {
          table: "Products",
          field: "id",
        },
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('AdTemplates', 'productId')
  }
};
