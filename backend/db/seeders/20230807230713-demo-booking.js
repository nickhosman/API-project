"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        options.tableName = "Bookings";
        await Booking.bulkCreate(
            [
                {
                    spotId: 1,
                    userId: 2,
                    startDate: "2023-9-17",
                    endDate: "2023-9-23",
                },
                {
                    spotId: 1,
                    userId: 4,
                    startDate: "2022-11-13",
                    endDate: "2022-11-20",
                },
                {
                    spotId: 2,
                    userId: 3,
                    startDate: "2023-12-20",
                    endDate: "2024-1-1",
                },
                {
                    spotId: 4,
                    userId: 1,
                    startDate: "2023-8-13",
                    endDate: "2023-8-16",
                },
            ],
            { validate: true }
        );
    },

    async down(queryInterface, Sequelize) {
        options.tableName = "Bookings";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                startDate: {
                    [Op.in]: [
                        "2023-9-17",
                        "2022-11-13",
                        "2023-12-20",
                        "2023-8-13",
                    ],
                },
            },
            {}
        );
    },
};
