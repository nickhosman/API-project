const express = require("express");
const {
    setTokenCookie,
    requireAuth,
    restoreUser,
} = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
    Spot,
    SpotImage,
    User,
    Review,
    ReviewImage,
} = require("../../db/models");

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

router.get("/current", requireAuth, async (req, res, next) => {
    const spots = await Spot.findAll({ where: { ownerId: req.user.id } });

    let Spots = [];

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

        Spots.push(spot.dataValues);
    }

    return res.json({ Spots });
});

router.get("/:spotId", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = { message: "Spot couldn't be found" };
        err.status = 404;
        return next(err);
    }
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

const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check("city").exists({ checkFalsy: true }).withMessage("City is required"),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check("lat")
        .exists({ checkFalsy: true })
        .custom((value) => {
            return parseInt(value) < 90 && parseInt(value) > -90;
        })
        .withMessage("Latitude is not valid"),
    check("lng")
        .exists({ checkFalsy: true })
        .custom((value) => {
            return parseInt(value) < 180 && parseInt(value) > -180;
        })
        .withMessage("Longitude is not valid"),
    check("name")
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors,
    requireAuth,
];
// Create a new spot as an authorized user
router.post("/", validateSpot, async (req, res, next) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    } = req.body;

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    });

    return res.json(spot);
});

// Add an image to a spot based on Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (spot) {
        if (req.user.id === spot.ownerId) {
            const { url, preview } = req.body;
            const newSpotImage = await SpotImage.create({
                spotId: req.params.spotId,
                url,
                preview,
            });

            return res.json({
                id: newSpotImage.id,
                url: newSpotImage.url,
                preview: newSpotImage.preview,
            });
        }
    }

    const err = new Error("Spot couldn't be found");
    err.title = "Spot couldn't be found";
    err.errors = { message: "Spot couldn't be found" };
    err.status = 404;
    return next(err);
});

// Updates and returns an existing spot.
router.put("/:spotId", validateSpot, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (spot) {
        if (spot.ownerId === req.user.id) {
            const {
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price,
            } = req.body;

            if (address) spot.address = address;
            if (city) spot.city = city;
            if (state) spot.state = state;
            if (country) spot.country = country;
            if (lat) spot.lat = lat;
            if (lng) spot.lng = lng;
            if (name) spot.name = name;
            if (description) spot.description = description;
            if (price) spot.price = price;

            await spot.save();

            res.json(spot);
        }
    }

    const err = new Error("Spot couldn't be found");
    err.title = "Spot couldn't be found";
    err.errors = { message: "Spot couldn't be found" };
    err.status = 404;
    return next(err);
});

// Delete an existing spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (spot) {
        if (spot.ownerId === req.user.id) {
            await spot.destroy();
            return res.json({ message: "Succesfully deleted" });
        }
    }

    const err = new Error("Spot couldn't be found");
    err.title = "Spot couldn't be found";
    err.errors = { message: "Spot couldn't be found" };
    err.status = 404;
    return next(err);
});

// Get all reviews by spot id
router.get("/:spotId/reviews", async (req, res, next) => {
    const Reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            { model: ReviewImage, attributes: ["id", "url"] },
        ],
    });
    console.log(Reviews);

    if (!Reviews.length) {
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.errors = { message: "Spot couldn't be found" };
        err.status = 404;
        return next(err);
    }

    return res.json({ Reviews });
});

const validateReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true })
        .custom((value) => {
            return parseInt(value) < 6 && parseInt(value) > 0;
        })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
    requireAuth,
];

// Create a review for a spot
router.post("/:spotId/reviews", validateReview, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (spot) {
        const thisReview = await Review.findOne({
            where: { userId: req.user.id, spotId: req.params.spotId },
        });

        if (thisReview) {
            const err = new Error("User already has a review for this spot");
            err.title = "User already has a review for this spot";
            err.errors = { message: "User already has a review for this spot" };
            err.status = 500;
            return next(err);
        }

        const { review, stars } = req.body;

        const newReview = await Review.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            review,
            stars,
        });

        return res.json(newReview);
    }

    const err = new Error("Spot couldn't be found");
    err.title = "Spot couldn't be found";
    err.errors = { message: "Spot couldn't be found" };
    err.status = 404;
    return next(err);
});

module.exports = router;
