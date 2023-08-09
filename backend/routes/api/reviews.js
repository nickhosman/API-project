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

router.get("/current", requireAuth, async (req, res, next) => {
    let Reviews = [];

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

    reviews.forEach((review) => {
        review = review.toJSON();
        review.Spot.SpotImages.forEach((spotImage) => {
            if (spotImage.preview === true) {
                review.Spot.previewImage = spotImage.url;
            }
        });
        delete review.Spot.SpotImages;
        Reviews.push(review);
    });
    res.json({ Reviews });
});

module.exports = router;
