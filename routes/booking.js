const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.js');
const Listing = require('../models/listing.js');
const { isLoggedIn } = require('../middelware.js');

// Show all bookings for the logged-in user
router.get('/your_bookings', isLoggedIn, async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('listing');
    res.render('bookings/index', { bookings });
});

module.exports = router;
