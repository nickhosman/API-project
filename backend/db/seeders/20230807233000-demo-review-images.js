"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await ReviewImage.bulkCreate([
            {
                reviewId: 1,
                url: "https://images.pexels.com/photos/5562758/pexels-photo-5562758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            {
                reviewId: 2,
                url: "https://images.pexels.com/photos/6032416/pexels-photo-6032416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        options.tableName = "ReviewImages";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                url: {
                    [Op.in]: [
                        "https://images.pexels.com/photos/5562758/pexels-photo-5562758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        "https://images.pexels.com/photos/6032416/pexels-photo-6032416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    ],
                },
            },
            {}
        );
    },
};
