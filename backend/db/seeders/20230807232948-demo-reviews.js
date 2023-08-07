"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Review.bulkCreate([
            {
                spotId: 1,
                userId: 3,
                review: "Pretty comfy and inviting. Would stay again",
                stars: 4,
            },
            {
                spotId: 2,
                userId: 1,
                review: "Too big, felt like I could get lost going to the restroom.",
                stars: 2,
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
                    ],
                },
            },
            {}
        );
    },
};
