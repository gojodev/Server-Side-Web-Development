var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

// using 127.0.0.1 cause something you run into issues if you use localhost instead
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
    when_booked: String,
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
        res.redirect('/viewBookings');
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('Error saving booking');
    }
});

router.post('/modify', async function (req, res) {
    try {
        let bookingInfo = req.body;
        console.log("modify: ", bookingInfo);
        // res.render('modify', { bookingInfo });
        // await BookingModel.findByIdAndUpdate(bookingInfo._id);
    }

    catch (error) {
        console.log("Error for modify: ", error);
        res.status(500).send("Couldn't modify all bookings");
    }
});

router.post('/deleteSome', async function (req, res) {
    try {
        let indexes = req.body;
        console.log("deleteSome:", indexes);

        for (let i = 0; i < indexes.length; i++) {
            await BookingModel.findByIdAndDelete(indexes[i]);
        }
    }

    catch (error) {
        console.log("Error for deleteSome: ", error);
        res.status(500).send("Couldn't delete some bookings");
    }
});

router.post('/deleteAll', async function (req, res) {
    try {
        console.log("deleted all records from the database")
        await BookingModel.deleteMany({});
    }

    catch (error) {
        console.log("Error for deleteAll: ", error);
        res.status(500).send("Couldn't delete all bookings");
    }
});

module.exports = router;
