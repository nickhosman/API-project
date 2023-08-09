const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Review, Spot, SpotImage, User, Booking } = require("../../db/models");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
    let currBookings = [];

    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "description"],
                },
                include: [{ model: SpotImage }],
            },
        ],
    });

    bookings.forEach((booking) => {
        booking = booking.toJSON();
        booking.Spot.SpotImages.forEach((spotImage) => {
            if (spotImage.preview === true) {
                booking.Spot.previewImage = spotImage.url;
            }
        });
        if (!booking.Spot.previewImage) {
            booking.Spot.previewImage = "No preview image found";
        }
        delete booking.Spot.SpotImages;
        currBookings.push(booking);
    });
    res.json({ Bookings: currBookings });
});

module.exports = router;
