var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const ejs = require("ejs");

// Establish the MongoDB connection only once when your application starts.
mongoose.connect('mongodb://127.0.0.1:27017/BookingDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const BookingSchema = new mongoose.Schema({
    id_tag: String,
    name: String,
    email: String,
    card_number: String,
    expiry_date: String,
    cvc: String,
    time: String,
    date: String,
    skill_level: String,
});

const BookingModel = mongoose.model('Booking', BookingSchema);

router.get('/viewBookings', async function (req, res) {
    try {
        const booking = await BookingModel.find({});

        let reversedBookings = booking.slice().reverse();

        // Assuming you have an EJS template 'viewBookings.ejs' to render the data.
        res.render('viewBookings', { bookings: reversedBookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send('Error fetching bookings');
    }
});


router.post('/viewBookings', async function (req, res) {
    try {
        const instance = new BookingModel(req.body);
        await instance.save();
        // Redirect to the view bookings page after saving.
        res.redirect('/viewBookings');
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('Error saving booking');
    }
});

module.exports = router;
