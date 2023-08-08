const express = require("express");
const sequelize = require("sequelize");

const { Spot, SpotImage, User, Review } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
    const spots = await Spot.findAll();

    for (const spot of spots) {
        // Add average rating to object
        const reviews = await Review.findAll({ where: { spotId: spot.id } });

        const reviewCount = reviews.length;

        const starTotal = reviews.reduce((total, review) => {
            total += review.stars;
            return total;
        }, 0);

        const avgRating = starTotal / reviewCount;
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

router.get("/:spotId", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    // Get reviews for this spot
    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
    });

    const numReviews = reviews.length;
    // Find the total number of stars across reviews for this spot
    const starTotal = reviews.reduce((total, review) => {
        total += review.stars;
        return total;
    }, 0);

    // Get the average rating
    const avgStarRating = starTotal / numReviews;
    spot.dataValues.numReviews = numReviews;
    spot.dataValues.avgStarRating = avgStarRating;

    // Get the images for this spot
    const spotImages = await SpotImage.findAll({
        where: { spotId: req.params.spotId },
        attributes: ["id", "url", "preview"],
    });
    // console.log(spotImages);
    spot.dataValues.SpotImages = [];
    for (const spotImage of spotImages) {
        spot.dataValues.SpotImages.push(spotImage.dataValues);
    }

    // Get the owner of this spot by Id
    const owner = await User.findByPk(spot.ownerId, {
        attributes: ["id", "firstName", "lastName"],
    });
    spot.dataValues.Owner = owner;

    return res.json(spot);
});

module.exports = router;
