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
                    url: "https://www.image.com/2345",
                    preview: false,
                },
                {
                    spotId: 1,
                    url: "https://www.image.com/1328",
                    preview: false,
                },
                {
                    spotId: 2,
                    url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    preview: true,
                },
                {
                    spotId: 2,
                    url: "https://www.image.com/8673",
                    preview: false,
                },
                {
                    spotId: 2,
                    url: "https://www.image.com/6732",
                    preview: false,
                },
                {
                    spotId: 3,
                    url: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    preview: true,
                },
                {
                    spotId: 3,
                    url: "https://www.image.com/4510",
                    preview: false,
                },
                {
                    spotId: 3,
                    url: "https://www.image.com/1074",
                    preview: false,
                },
                {
                    spotId: 4,
                    url: "https://images.pexels.com/photos/3164593/pexels-photo-3164593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    preview: true,
                },
                {
                    spotId: 4,
                    url: "https://www.image.com/4218",
                    preview: false,
                },
                {
                    spotId: 4,
                    url: "https://www.image.com/0034",
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
                        "https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        "https://www.image.com/2345",
                        "https://www.image.com/1328",
                        "https://www.image.com/8673",
                        "https://www.image.com/6732",
                        "https://www.image.com/4510",
                        "https://www.image.com/1074",
                        "https://images.pexels.com/photos/3164593/pexels-photo-3164593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                        "https://www.image.com/4218",
                        "https://www.image.com/0034",
                    ],
                },
            },
            {}
        );
    },
};
