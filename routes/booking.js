// todo: use fusejs  for the search function ( https://www.fusejs.io/ )

const express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


/**
 * 
 * @param {JSON} data 
 */
async function uploadBookings(data) {
  await mongoose.connect('mongodb://127.0.0.1:27017/BookingDB')
    .then(() => console.log('Connected!'))
    .catch(() => console.log("Not Connected"));

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

// todo: create html from js
function displayBookings(data) {
  console.log("id: ", data.id_tag);

  if (typeof document !== 'undefined') {
    const created_li = document.createElement("li");
    const node = document.createTextNode(data.id_tag);
    created_li.appendChild(node);

    const ul_elem = document.getElementById("ul");
    ul_elem.value = "test";
    ul_elem.inert(created_li);
  }
}

router.get('/booking', function (req, res) {
  res.render('booking');
});

router.get('/viewBookings', function (req, res) {
  res.render('viewBookings');
});

router.post('/viewBookings', function (req, res) {
  res.render('viewBookings');
  let data = req.body;
  // createBooking(data);
  displayBookings(data);
});




module.exports = router;
