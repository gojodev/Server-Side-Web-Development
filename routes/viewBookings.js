var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

// Define the Mongoose model outside of the function so i don't overwrite it when i call upon it multiple times
const BookingSchema = new mongoose.Schema({
    // Define your schema fields here
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

const BookingModel = mongoose.model('BookingDB', BookingSchema);

async function UpdateBookings(data) {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BookingDB');
        console.log('Connected!');

        // Create a new instance of the model and save it
        const instance = new BookingModel(data);
        await instance.save();

    } catch (error) {
        console.error('Connection or save error:', error);
    }
}

async function GetBookings() {
    try {
        const bookings = await BookingModel.find({});
        return bookings;
    } catch (err) {
        console.log(err);
        throw err; // Re-throw the error to indicate that an error occurred
    }
}


router.get('/viewBookings', async function (req, res) {
    try {
        let bookings = await GetBookings();
        console.log("bookings: ", bookings);
        res.render('viewBookings');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/viewBookings', async function (req, res) {
    try {
        let bookings = await UpdateBookings(req.body);
        res.render('viewBookings', { bookings });
    } catch (err) {
        console.error(err);
        // status 500 is a generic error response and is only included out out of best practice
        res.status(500).send(err);
    }
});

module.exports = router;