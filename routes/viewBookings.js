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
    whenBooked: String,
    name: String,
    email: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String,
    time: String,
    date: String,
    skillLevel: String,
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

// ! GLOBAL
var Modifybooking;
// one is needed to send the booking data to the modify page for the client side
router.post('/modify', async function (req, res) {
    try {
        Modifybooking = req.body;
        res.render('modify', { bookings: Modifybooking });
    }

    catch (error) {
        console.log("Error for modify: ", error);
        res.status(500).send("POST: Couldn't modify all bookings");
    }
});

router.get('/modify', async function (req, res) {
    try {

        console.log("GET MOdify: ", Modifybooking);
        if (Modifybooking == undefined) {
            Modifybooking = '';
        }
        res.render('modify', { bookings: Modifybooking });
    }
    catch (error) {
        console.log("Error for modify: ", error);
        res.status(500).send("GET: Couldn't modify all bookings");
    }
});

// the other one is needed to send the edited information over to the database
router.post('/modifyDB/:id', async function (req, res) {
    try {
        let booking = req.body;
        await BookingModel.findByIdAndUpdate(req.params.id, booking);

        res.redirect('http://localhost:3000/viewBookings');
    }

    catch (error) {
        console.log("Error for modify: ", error);
        res.status(500).send("POST modifyDB: Couldn't modify all bookings");
    }
});

router.post('/deleteSome', async function (req, res) {
    try {
        let indexes = req.body;

        for (let i = 0; i < indexes.length; i++) {
            await BookingModel.findByIdAndDelete(indexes[i]);
        }

        res.render('viewBookings');
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
        res.render('viewBookings');
    }

    catch (error) {
        console.log("Error for deleteAll: ", error);
        res.status(500).send("Couldn't delete all bookings");
    }
});

module.exports = router;
