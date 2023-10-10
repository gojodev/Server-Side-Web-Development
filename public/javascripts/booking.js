// ? add a validation file?
// todo: add a little x button at the top of the summarised booking details in the modify and delete section
// todo: setup mongoDB
// todo: add a clear all button
// todo: add a white border if the same person makes multiple bookings
// todo: on the home page show the different things that they will learn (nodejs, html, css, javascript, python, java etc...)

// ! bookings are being overwritten and are not being output to the corret location

// firebase hosting:channel:deploy preview (at root)
// ! GLOBAL
let active_bookings = 0;

// todo: create error message section
function error_msg(message, element_ids) {

    for (let i = 0; i < element_ids.length; i++) {
        document.getElementById(element_ids[i]).classList.toggle("error_borders")
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

function hideBookings() {
    if (active_bookings == 0) {
        for (let i = 0; i < 4; i++) {
            booking_id = `booking${i + 1}`;

            document.getElementById(booking_id).classList.toggle("hide");
        }
    }
    else {
        for (let i = 0; i < active_bookings; i++) {
            booking_id = `booking${4 - i}`;

            document.getElementById(booking_id).classList.toggle("hide");
        }
    }
}

// ! hides the booking details before the page laods
hideBookings();


// ! GLOBAL
/**
 * 
 * @param {JSON} data 
 */
function createBooking(data, booking_id) {
    let name = data.name;
    let email = data.email;
    let skill_level = data.skill_level;

    let date = new Date().toDateString();
    let details = `${name} , ${email} , ${date} , ${skill_level}`;
    // ! validation

    active_bookings++;
    let booking = document.getElementById(booking_id);
    booking.innerHTML = details;
    booking.classList.toggle("show");
}


// will added to the functions once the getBookingDetails and validation is working properly
// ! this will also delete bookings
function modifyBooking() {

}

function getBookingDetails() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let skill_level = document.getElementById("skill_level").value;

    // validating the date input
    let current_date = new Date();
    let input_date = new Date(date);

    input_date = input_date.getTime();
    current_date = current_date.getTime();

    let invalid_name = name == "";
    let invalid_date = !(input_date >= current_date);

    console.log("input_Date: ", input_date);
    console.log("current_date: ", current_date);
    console.log("valid date: ", input_date == current_date);

    let isError = false;

    // todo: validate email input

    // not use switch cases because i'm using different expressions
    if (invalid_name) {
        error_msg("Invalid name input", ["name"]);
        isError = true;
    }
    else if (invalid_date) {
        error_msg("Invalid date", ["date"]);
        isError = true;
    }
    // no need to 

    // ! send this to MongoDB later
    let data = {
        "name": name,
        "email": email,
        "date": input_date,
        "skill_level": skill_level
    };

    // +1 because youof 0 indexing and the variable is just under the createBooking()
    // which is used to increase the value of active_bookings
    // also don't create the booking if there are errors
    if (isError == false) {
        let id = active_bookings + 1;
        booking_id = `booking${id}`;
        console.log(booking_id);
        createBooking(data, booking_id);
        console.log(booking_id, data);
    }

}

// this function doesn't need to wait for the submit button to be pressed
function autoDate() {
    // automically set the current date
    let today = new Date().toJSON().slice(0, 10);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toJSON().slice(0, 10);
    console.log("tomorrow: ", tomorrow);
    document.getElementById("date").value = tomorrow;
}
autoDate();

document.getElementById("submit_button").addEventListener("click", getBookingDetails);

function test_input() {
    document.getElementById("name").value = "Emmanuel Koledoye";
    document.getElementById("email").value = "example@gmail.com";
    document.getElementById("skill_level").value = "Advanced";
}

let counter = 0;
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

// ! for testing only comment out or delete later
// test with name1, name2, etc and rmeove duplication and placement issues
test_input()