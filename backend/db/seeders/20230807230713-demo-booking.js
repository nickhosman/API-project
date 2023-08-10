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
                    spotId: 3,
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
                    [Op.in]: ["2023-9-17", "2023-8-13"],
                },
            },
            {}
        );
    },
};
