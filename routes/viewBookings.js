var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const ejs = require("ejs");

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/BookingDB');
    console.log('Connected!');
}

connect();

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


router.get('/viewBookings', async function (req, res) {
    const bookings = await BookingModel.find({});
    console.log("GET bookings: ", bookings);
    ejs.renderFile('viewBookings', { bookings: bookings});
});

router.post('/viewBookings', async function (req, res) {
    const instance = new BookingModel(req.body);
    await instance.save();
    ejs.renderFile('viewBookings');
});

module.exports = router;

/**
 * current issues:
 * page is slow when loading both get and post requests
 * you were able to show the id_tag ONCE but you can't handle an array of JSONs
 * even if you can insert the array of json bookings you still need a way to render tjem automically
 * you don't know how to use js to create SEPERATE html tables for each id_tag 
 * (i say id_tag and not user because i'll allow multiple bookings from the same person)
 * 
 * In short:
 * - fix speed
 * - display booking info
 */
