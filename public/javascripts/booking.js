// ? add a validation file?
// todo: setup mongoDB + mongoose
// todo: use fusejs  for the search function ( https://www.fusejs.io/ )
// todo: use nanoid for userid
// todo: look into the difference between MongoDB and mongoose cause they are seperate but is prob better off using MongoDBs version

// firebase hosting:channel:deploy preview (at root)

import { nanoid } from 'nanoid';
const express = require('express');
var router = express.Router();

function createBooking(data) {
    router.get("/viewBookings", function (req, res) {
        console.log("client side");
        res.send(data);
    });
}

function error_msg(message, element_ids) {

    for (let i = 0; i < element_ids.length; i++) {
        document.getElementById(element_ids[i]).classList.toggle("error_borders");
    }

    document.getElementById("error_section").classList.toggle("hide");
    document.getElementById("error_text").innerHTML = message;
    console.log(message); // ! helps with debugging and will be removed later
}

function hide_errors() {
    document.getElementById("error_section").classList.toggle("hide");
}

// ! hide the error seciton for the page lodas
hide_errors();

// ! GLOBAL
// the boolean value helpt so check if the function has already run so that the user won't have to see error messages before they can even input anything
let isFirstRun = false;

// no .value because i'm using event listeners and will later get their value
let card_number = document.getElementById("card_number");
let expiry_date = document.getElementById("expiry_date");

// ! CARD DETAILS ------------------

let counter = 1;

card_number.addEventListener("input", () => card_number.value = formatNumber(card_number.value.replaceAll(" ", "")));

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
    if (index !== 0 && index % 4 == 0) seed += " ";
    return seed + next;
}, "");
// add a slash automically for the expiry date inbetween the 2nd and 3rd number
expiry_date.addEventListener("input", () => expiry_date.value = slasher(expiry_date.value.replaceAll(" ")));

const slasher = (number) => number.split("").reduce((seed, next, index) => {
    if (index % 2 == 0 && index !== 0 && !expiry_date.value.includes("/")) seed += "/";
    return seed + next;
}, "");

// ! CARD DETAILS ------------------

function getBookingDetails() {
    isFirstRun = true;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let cvc = document.getElementById("cvc").value;
    let time = document.getElementById("time").value;
    let skill_level = document.getElementById("skill_level").value;

    let current_date = new Date();
    let input_date = new Date(date);

    let input_date_time = input_date.getTime();
    let current_date_time = current_date.getTime();

    let invalid_name = name == "";
    let invalid_date = !(input_date_time >= current_date_time);
    let invalid_email = !(email.includes("@") && email.includes("."));

    let isError = false;
    // input_date = input_date.toDateString();

    date = new Date(input_date);
    date.setDate(date.getDate() + 1);
    date = date.toJSON().slice(0, 10);

    if (invalid_name) {
        error_msg("Invalid name input", ["name"]);
        isError = true;
    }
    else if (invalid_email) {
        error_msg("Invalid email input", ["email"]);
        isError = true;
    }
    else if (invalid_date) {
        error_msg("Invalid date", ["date"]);
        isError = true;
    }

    let data = {
        "id": nanoid(),
        "name": name,
        "email": email,
        "card_number": card_number.value,
        "expiry_date": expiry_date.value,
        "cvc": cvc,
        "time": time,
        "date": date,
        "skill_level": skill_level,
    };

    if (isError == false) {
        createBooking(data);
        console.log(data);
    }
    else {
        error_msg("Something went wrong :(", ["create_container"]);
    }

    // direct the user to viewBookings.ejs
    window.location = "localhost:3000/viewBookings";
}


function autoFill(data) {
    let id_desc = ["name", "email", "card_number", "expiry_date", "cvc", "time", "date", "skill_level"];

    for (let i = 0; i < id_desc.length; i++) {
        let key = id_desc[i];
        let value = data[key];

        data[key] = value;
        document.getElementById(key).value = value;
    }
}

// ! send this to MongoDB later
let data = {
    "name": "Emmanuel Koledoye",
    "email": "example@gmail.com",
    "card_number": "1111 2222 3333 5555",
    "expiry_date": "10/28",
    "cvc": "123",
    "time": "17:00",
    "date": "2023-10-31",
    "skill_level": "Advanced"
};

autoFill(data);


if (isFirstRun) {
    getBookingDetails();
}

document.getElementById("submit_button").addEventListener("click", getBookingDetails);

// ! make sure this function doesn't overwite autoFill()
// this function doesn't need to wait for the submit button to be pressed
function autoDate() {
    // automically set the current date
    let today = new Date().toJSON().slice(0, 10);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toJSON().slice(0, 10);
    document.getElementById("date").value = tomorrow;
}
// autoDate();

counter = 0;
function flashNotice() {
    if (counter == 0) {
        document.getElementById("notice").classList.toggle("flash");
        counter = 1;
    }
    else {
        document.getElementById("notice").classList.toggle("not-flash");
        counter = 0;
    }

    setTimeout(flashNotice, 700);
}

flashNotice();
