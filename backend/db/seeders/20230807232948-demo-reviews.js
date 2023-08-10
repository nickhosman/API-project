"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        options.tableName = "Reviews";
        await Review.bulkCreate([
            {
                spotId: 1,
                userId: 3,
                review: "Pretty comfy and inviting. Would stay again",
                stars: 4,
            },
            {
                spotId: 1,
                userId: 4,
                review: "Enjoyable experience",
                stars: 3,
            },
            {
                spotId: 1,
                userId: 2,
                review: "Great place, good times",
                stars: 5,
            },
            {
                spotId: 2,
                userId: 1,
                review: "Too big, felt like I could get lost going to the restroom.",
                stars: 2,
            },
            {
                spotId: 2,
                userId: 3,
                review: "Very pleasant stay",
                stars: 5,
            },
            {
                spotId: 3,
                userId: 1,
                review: "Okay",
                stars: 3,
            },
            {
                spotId: 3,
                userId: 4,
                review: "Pretty decent",
                stars: 4,
            },
            {
                spotId: 3,
                userId: 2,
                review: "Good view",
                stars: 4,
            },
            {
                spotId: 4,
                userId: 1,
                review: "Way too small",
                stars: 1,
            },
            {
                spotId: 4,
                userId: 2,
                review: "Owner kept peeking through the windows",
                stars: 1,
            },
            {
                spotId: 4,
                userId: 3,
                review: "Not as bad as other reviews made it seem",
                stars: 4,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        options.tableName = "Reviews";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                review: {
                    [Op.in]: [
                        "Pretty comfy and inviting. Would stay again",
                        "Too big, felt like I could get lost going to the restroom.",
                        "Enjoyable experience",
                        "Great place, good times",
                        "Very pleasant stay",
                        "Okay",
                        "Pretty decent",
                        "Good view",
                        "Way too small",
                        "Owner kept peeking through the windows",
                        "Not as bad as other reviews made it seem",
                    ],
                },
            },
            {}
        );
    },
};
