"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://images.pexels.com/photos/5998041/pexels-photo-5998041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://images.pexels.com/photos/4906407/pexels-photo-4906407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=13",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://images.pexels.com/photos/5824499/pexels-photo-5824499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://images.pexels.com/photos/4917176/pexels-photo-4917176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://images.pexels.com/photos/4857776/pexels-photo-4857776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://images.pexels.com/photos/3164593/pexels-photo-3164593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://images.pexels.com/photos/5490199/pexels-photo-5490199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://images.pexels.com/photos/4857776/pexels-photo-4857776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://images.pexels.com/photos/4857776/pexels-photo-4857776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/5490199/pexels-photo-5490199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/3164593/pexels-photo-3164593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/4917176/pexels-photo-4917176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/5824499/pexels-photo-5824499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/4906407/pexels-photo-4906407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=13",
            "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/5998041/pexels-photo-5998041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/5824497/pexels-photo-5824497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          ],
        },
      },
      {}
    );
  },
};
