// todo: use fusejs  for the search function ( https://www.fusejs.io/ )

const express = require('express');
var router = express.Router();
const mongoose = require("mongoose");


/**
 * 
 * @param {JSON} data 
 */
async function uploadBookings(data) {
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
      date: { type: Date, set: (value) => data.date },
      skill_level: { type: String, set: (value) => data.skill_level },
    });

    const BookingModel = mongoose.model('BookingDB', BookingSchema);

    const instance = new BookingModel(data);
    await instance.save();
  } catch (error) {
    console.error('Connection or save error:', error);
  }
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
  uploadBookings(req.body);
  res.render('viewBookings');
});




module.exports = router;
