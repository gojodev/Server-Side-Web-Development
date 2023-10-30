// todo: use fusejs for the search function for phase 2 ( https://www.fusejs.io/ )
// todo: list all bookings using EJS templates (dynamic variable insertion) and use JS to create more DOM objects from the server side

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

async function GetBookings(data) {
    let isFirstRun = false;
    // upload to the database
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/BookingDB');
        console.log('Connected!');

        const Schema = mongoose.Schema;

        const BookingSchema = new Schema({
            // mongoose setters erquire a function that takes a value as an argument
            // the defined function as setter is responsible for setting the value
            id_tag: { type: String, set: (value) => data.id_tag },
            name: { type: String, set: (value) => data.name },
            email: { type: String, set: (value) => data.email },
            card_number: { type: String, set: (value) => data.card_number },
            expiry_date: { type: String, set: (value) => data.expiry_date },
            cvc: { type: String, set: (value) => data.cvc },
            time: { type: String, set: (value) => data.time },
            date: { type: String, set: (value) => data.date },
            skill_level: { type: String, set: (value) => data.skill_level },
        });

        let BookingModel;
        if (isFirstRun == false) {
            BookingModel = mongoose.model('BookingDB', BookingSchema);
            isFirstRun = true;
        }

        const instance = new BookingModel(data);
        await instance.save();

        const BookingPromise = await BookingModel.find({}); // Fetch all bookings from BookingDB (it's an array of JSONs)

        let BookingData = Promise.resolve(BookingPromise);

        try {
            const bookingsResolved = await BookingData;
            console.log("------------bookingsResolved: ", bookingsResolved);
            return bookingsResolved;
        } catch (err) {
            console.log(err);
        }

    } catch (error) {
        console.error('Connection or save error:', error);
    } finally {
        mongoose.disconnect(); // Close the database connection when done
    }
}

router.get('/viewBookings', function (req, res) {
    let bookings = GetBookings(req.body);
    res.render('viewBookings', { bookings });

});

router.post('/viewBookings', function (req, res) {
    let bookings = GetBookings(req.body);
    res.render('viewBookings', { bookings });
});

module.exports = router;