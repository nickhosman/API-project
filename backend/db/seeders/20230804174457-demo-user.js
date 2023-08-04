"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

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
        await User.bulkCreate(
            [
                {
                    email: "demo@user.io",
                    username: "Demo-lition",
                    hashedPassword: bcrypt.hashSync("password"),
                    firstName: "Demo",
                    lastName: "User",
                },
                {
                    email: "me@my.self",
                    username: "myeself",
                    hashedPassword: bcrypt.hashSync("password2"),
                    firstName: "Maya",
                    lastName: "Self",
                },
                {
                    email: "holymackerel@gmail.com",
                    username: "HolyMackerel",
                    hashedPassword: bcrypt.hashSync("password3"),
                    firstName: "Holly",
                    lastName: "Mackerel",
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
        options.tableName = "Users";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            options,
            {
                username: {
                    [Op.in]: ["Demo-lition", "myeself", "HolyMackerel"],
                },
            },
            {}
        );
    },
};
