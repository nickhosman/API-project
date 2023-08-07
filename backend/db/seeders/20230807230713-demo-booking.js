"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await Booking.bulkCreate(
            [
                {
                    spotId: 1,
                    userId: 2,
                    startDate: "9-17-2023",
                    endDate: "9-23-2023",
                },
                {
                    spotId: 3,
                    userId: 1,
                    startDate: "8-13-2023",
                    endDate: "8-16-2023",
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
                    [Op.in]: ["9-17-2023", "8-13-2023"],
                },
            },
            {}
        );
    },
};
