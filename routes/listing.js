// const express = require('express');
// const router = express.Router();
// const Listing = require('../models/listing.js');
// const User = require('../models/user.js');
// const { isLoggedIn, isOwner } = require('../middelware.js');
// const listingController = require('../controllers/listing.js');
// const QRCode = require('qrcode');
// const { v4: uuidv4 } = require('uuid');
// const PDFDocument = require('pdfkit');

// // Index Route - Show all listings
// router.get('/', listingController.index);

// // New Listing Form Route
// router.get('/new', isLoggedIn, listingController.renderNewForm);

// // Show Route - Show details of a specific listing
// router.get('/:id', listingController.showRoute);

// //about and app_info page
// // about and app_info page
// // router.get('/app-info', (req, res) => {
// //     res.render('listings/app-info');
// // });

// // router.get('/conditions', (req, res) => {
// //     res.render('listings/conditions');
// // });

// // router.get('/about-us', (req, res) => {
// //     res.render('listings/about-us');
// // });

  
  
  



// router.get('/:id/book', isLoggedIn, async (req, res) => {
//     try {
//         const listing = await Listing.findById(req.params.id);
//         if (!listing) {
//             req.flash('error', 'Museum not found!');
//             return res.redirect('/listings');
//         }
//         res.render('listings/bookticket', { listing });
//     } catch (error) {
//         console.error(error);
//         req.flash('error', 'Something went wrong!');
//         res.redirect('/listings');
//     }
// });

// // POST route to handle booking submission and generate the ticket as a PDF
// router.post('/:id/book', async (req, res) => {
//     try {
//         const listing = await Listing.findById(req.params.id);
//         if (!listing) {
//             req.flash('error', 'Museum not found!');
//             return res.redirect('/listings');
//         }

//         const { museumName, members, visitDate, userName, userNumber } = req.body;
//         const ticketId = uuidv4(); // Generate a unique ticket ID

//         // Generate QR codes for entry and exit
//         const entryQR = await QRCode.toDataURL(`Entry - Ticket ID: ${ticketId}`);
//         const exitQR = await QRCode.toDataURL(`Exit - Ticket ID: ${ticketId}`);

//         // Create a PDF document
//         const doc = new PDFDocument();

//         // Set the PDF headers to download the ticket as a file
//         res.setHeader('Content-disposition', 'attachment; filename=ticket.pdf');
//         res.setHeader('Content-type', 'application/pdf');

//         // Pipe the PDF document to the response
//         doc.pipe(res);

//         // Add content to the PDF
//         doc.fontSize(25).text('Museum Ticket', { align: 'center' });
//         doc.moveDown();
//         doc.fontSize(18).text(`Museum Name: ${museumName}`);
//         doc.text(`Visit Date: ${visitDate}`);
//         doc.text(`Number of Members: ${members}`);
//         doc.text(`User Name: ${userName}`);
//         doc.text(`User Mobile: ${userNumber}`);
//         doc.text(`Ticket ID: ${ticketId}`);

//         doc.moveDown();

//         // Add QR codes to the PDF with spacing and alignment
//         const qrSize = 100; // Size of the QR codes
//         const xMargin = 50; // Margin from the edges
//         const yPosition = doc.y; // Current vertical position

//         // Position entry QR on the left side
//         doc.fontSize(12).text('Entry QR Code:', xMargin, yPosition);
//         doc.image(entryQR, xMargin, yPosition + 20, { fit: [qrSize, qrSize] });

//         // Position exit QR on the right side
//         const rightMargin = 500 - qrSize - xMargin; // Adjust for page width and QR size
//         doc.fontSize(12).text('Exit QR Code:', rightMargin, yPosition);
//         doc.image(exitQR, rightMargin, yPosition + 20, { fit: [qrSize, qrSize] });

//         // Finalize the PDF
//         doc.end();
//     } catch (error) {
//         console.error('Error occurred during ticket booking:', error);
//         req.flash('error', 'Could not book the ticket!');
//         res.redirect(`/listings/${req.params.id}/book`);
//     }
// });


// // GET route for the mock payment page
// // router.get('/:id/payment', (req, res) => {
// //     const booking = req.session.booking;
// //     if (!booking) {
// //         req.flash('error', 'No booking found. Please try again.');
// //         return res.redirect(`/listings/${req.params.id}/book`);
// //     }

// //     // Render mock payment page
// //     res.render('listings/payment', { booking });
// // });

// // POST route to simulate payment confirmation
// // router.post('/:id/confirm-payment', async (req, res) => {
// //     try {
// //         const booking = req.session.booking;
// //         if (!booking) {
// //             req.flash('error', 'No booking found. Please try again.');
// //             return res.redirect(`/listings/${req.params.id}/book`);
// //         }

// //         // Simulate successful payment without actual implementation
// //         req.flash('success', 'Payment (simulated) successful! Your ticket has been booked.');
// //         res.redirect(`/listings/${req.params.id}/confirmation`);
// //     } catch (error) {
// //         console.error(error);
// //         req.flash('error', 'Payment failed. Please try again.');
// //         res.redirect(`/listings/${req.params.id}/payment`);
// //     }
// // });

// // Confirmation page after mock payment
// // router.get('/:id/confirmation', (req, res) => {
// //     const booking = req.session.booking;
// //     if (!booking) {
// //         req.flash('error', 'No booking found. Please try again.');
// //         return res.redirect('/listings');
// //     }

// //     // Render confirmation page with booking details
// //     res.render('listings/confirmation', { booking });
// //     // Optionally clear session after confirmation
// //     req.session.booking = null;
// // });

// // Create Route for adding new listing
// router.post('/', isLoggedIn, listingController.createNewPost);

// // Edit Route - Render edit form
// router.get('/:id/edit', isLoggedIn, isOwner, listingController.editRoute);

// // Update Route - Update the listing
// router.put('/:id', isLoggedIn, isOwner, listingController.updateRoute);

// // Delete Route - Remove a listing
// router.delete('/:id', isLoggedIn, isOwner, listingController.deleteRoute);

// module.exports = router;


const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
<<<<<<< HEAD
const Review = require('../models/review.js');
const User = require('../models/user.js');
const Booking = require('../models/booking.js');
const { isLoggedIn , isOwner } = require('../middelware.js');
=======
const { isLoggedIn, isOwner } = require('../middelware.js');
const listingController = require('../controllers/listing.js');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit');
>>>>>>> 5d8e7293063bac7671b79939c3dd71ef4a280440

// Home page listing
router.get('/', listingController.index);

// New form
router.get('/new', isLoggedIn, listingController.renderNewForm);

// Create new
router.post('/', isLoggedIn, listingController.createNewPost);

// Show detail
router.get('/:id', listingController.showRoute);

// Book ticket form
router.get('/:id/book', isLoggedIn, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash('error', 'Museum not found!');
    return res.redirect('/listings');
  }
  res.render('listings/bookticket', { listing });
});

// Submit booking + generate PDF
router.post('/:id/book', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash('error', 'Museum not found!');
      return res.redirect('/listings');
    }

    const { museumName, members, visitDate, userName, userNumber } = req.body;
    const ticketId = uuidv4();
    const entryQR = await QRCode.toDataURL(`Entry - Ticket ID: ${ticketId}`);
    const exitQR = await QRCode.toDataURL(`Exit - Ticket ID: ${ticketId}`);

    const doc = new PDFDocument();
    res.setHeader('Content-disposition', 'attachment; filename=ticket.pdf');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(25).text('Museum Ticket', { align: 'center' }).moveDown();
    doc.fontSize(18).text(`Museum Name: ${museumName}`);
    doc.text(`Visit Date: ${visitDate}`);
    doc.text(`Number of Members: ${members}`);
    doc.text(`User Name: ${userName}`);
    doc.text(`User Mobile: ${userNumber}`);
    doc.text(`Ticket ID: ${ticketId}`).moveDown();

<<<<<<< HEAD
// Book Ticket Route (GET)
router.get('/:id/book', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send('Listing not found');
        }
        res.render('listings/book', { listing });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Fake payment route
router.post('/:id/book/fake-payment', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { name, checkin, checkout, guests } = req.body;
    const booking = new Booking({
        user: req.user._id,
        listing: id,
        name,
        checkin,
        checkout,
        guests,
        status: 'Booked'
    });
    await booking.save();
    res.render('listings/fake-success');
});

module.exports = router;
=======
    const qrSize = 100;
    const xMargin = 50;
    const y = doc.y;

    doc.fontSize(12).text('Entry QR Code:', xMargin, y);
    doc.image(entryQR, xMargin, y + 20, { fit: [qrSize, qrSize] });

    const rightMargin = 500 - qrSize - xMargin;
    doc.text('Exit QR Code:', rightMargin, y);
    doc.image(exitQR, rightMargin, y + 20, { fit: [qrSize, qrSize] });

    doc.end();
  } catch (error) {
    console.error('Booking error:', error);
    req.flash('error', 'Ticket booking failed!');
    res.redirect(`/listings/${req.params.id}/book`);
  }
});

// Edit, Update, Delete
router.get('/:id/edit', isLoggedIn, isOwner, listingController.editRoute);
router.put('/:id', isLoggedIn, isOwner, listingController.updateRoute);
router.delete('/:id', isLoggedIn, isOwner, listingController.deleteRoute);

module.exports = router;
>>>>>>> 5d8e7293063bac7671b79939c3dd71ef4a280440
