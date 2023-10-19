/**
 * you're not using esbuild so no es6
 * you're trying to use mongoose and express from here
 * figure out how to collect the form data from booking.ejs
 */

var express = require('express');
var router = express.Router();

// const nanoid = require("nanoid");
const mongoose = require("mongoose");
const { create } = require('lodash');

/**
 * 
 * @param {JSON} data 
 */
async function createBooking(data) {
  await mongoose.connect('mongodb://127.0.0.1:27017/BookingDB')
      .then(() => console.log('Connected!'));

  const Schema = mongoose.Schema;

  const BookingSchema = new Schema({
      id: { type: String, set: data.id },
      name: { type: String, set: data.name },
      email: { type: String, set: data.email },
      card_number: { type: String, set: data.card_number },
      expiry_date: { type: String, set: data.expiry_date },
      cvc: { type: String, set: data.cvc },
      time: { type: String, set: data.time },
      date: { type: Date, set: data.date },
      skill_level: { type: String, set: data.skill_level },
  });

  const BookingModel = mongoose.model('bookings', BookingSchema);

  const m = new BookingModel();
  await m.save();
}

router.get('/booking', function (req, res) {
  res.render('booking');
});

router.post('/booking', function (req, res) {
  // createBooking(data);
  console.log("POST REQUEST MADE");
});

module.exports = router;
