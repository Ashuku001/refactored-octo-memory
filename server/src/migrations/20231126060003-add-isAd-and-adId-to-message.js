"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // return Promise.all([
      await queryInterface.addColumn("Messages", "adId", {
        type: Sequelize.INTEGER,
      })

      await queryInterface.addColumn("Messages", "isAd", {
        type: Sequelize.BOOLEAN,
      })
      
      await queryInterface.addConstraint("Messages", {
        fields: ["adId"],
        type: "foreign key",
        name: "fk_ad_id",
        references: {
          table: "Ads",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    // ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Messages', 'adId'),
      queryInterface.removeColumn('Messages', 'isAd'),
      ]);
  },
};
