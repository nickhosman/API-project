const express = require("express");
const sequelize = require("sequelize");

const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Review } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
    const spots = await Spot.findAll();

    for (const spot of spots) {
        // Add average rating to object
        const reviews = await Review.findAll({ where: { spotId: spot.id } });

        const starCount = reviews.length;

        const starTotal = reviews.reduce((total, review) => {
            total += review.stars;
            return total;
        }, 0);

        const avgRating = starTotal / starCount;
        spot.dataValues.avgRating = avgRating;

        // Add previewImage url to object
        const previewImage = await SpotImage.findOne({
            where: { spotId: spot.id, preview: true },
        });

        if (previewImage) {
            spot.dataValues.previewImage = previewImage.url;
        }
    }

    return res.json(spots);
});

module.exports = router;
