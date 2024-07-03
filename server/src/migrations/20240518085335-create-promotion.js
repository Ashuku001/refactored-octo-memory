"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Promotions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.ENUM([
          "coupon",
          "free_gifts",
          "discount",
          "free_shipping",
          "upsell_special",
          "member_referral",
          "free_trial",
          "give_away",
          "bogo",
          "loyalty",
          "bundle",
          "tiered_discount",
          "subscription",
          "flash_sale",
          "competition",
          "donation",
          "cash_back",
        ]),
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      discountType: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
      },
      discountValue: {
        type: Sequelize.DECIMAL,
      },
      storeId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Promotions");
  },
};
