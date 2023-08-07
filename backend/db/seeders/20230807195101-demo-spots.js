"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
    options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await Spot.bulkCreate(
            [
                {
                    ownerId: 1,
                    address: "123 Address Ave",
                    city: "Townberg",
                    state: "California",
                    country: "United States",
                    lat: 37.049697,
                    lng: -121.771669,
                    name: "Cozy Home",
                    description: "A small cozy place for a pleasant stay.",
                    price: 75.0,
                },
                {
                    ownerId: 2,
                    address: "762 Place St",
                    city: "Localmore",
                    state: "Arkansas",
                    country: "United States",
                    lat: 34.459862,
                    lng: -91.655539,
                    name: "Other Place",
                    description: "This is definitely a place that exists.",
                    price: 27.53,
                },
                {
                    ownerId: 3,
                    address: "8221 Franklin Ave",
                    city: "Placeton",
                    state: "Colorado",
                    country: "United States",
                    lat: 39.346379,
                    lng: -104.372863,
                    name: "This One",
                    description: "A temporary home for you.",
                    price: 38.64,
                },
            ],
            { validate: true }
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        options.tableName = "Spots";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                name: {
                    [Op.in]: ["Cozy Home", "Other Place", "This One"],
                },
            },
            {}
        );
    },
};
