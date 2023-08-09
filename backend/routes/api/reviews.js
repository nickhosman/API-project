const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
    Review,
    Spot,
    SpotImage,
    User,
    ReviewImage,
} = require("../../db/models");

const router = express.Router();

// Get all reviews by currently logged in user
router.get("/current", requireAuth, async (req, res, next) => {
    let Reviews = [];
    // Get reviews
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "description"],
                },
                include: [{ model: SpotImage }],
            },
            { model: ReviewImage, attributes: ["id", "url"] },
        ],
    });
    // Modifying data of each review to match output requirements
    reviews.forEach((review) => {
        review = review.toJSON();
        review.Spot.SpotImages.forEach((spotImage) => {
            if (spotImage.preview === true) {
                review.Spot.previewImage = spotImage.url;
            }
        });
        if (!review.Spot.previewImage) {
            review.Spot.previewImage = "No preview image found";
        }
        delete review.Spot.SpotImages;
        Reviews.push(review);
    });
    res.json({ Reviews });
});

// Get all reviews for a spot by id

module.exports = router;
