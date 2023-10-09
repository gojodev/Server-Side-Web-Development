// ? add a validation file?
// it may be tempteing to use esbuild and a bundler but use express js to request data from html
// todo: add a little x button at the top of the summarised booking details in the modify and delete section
// todo: setup mongoDB
// todo: add a favicon
// todo: fix placement with "Coding Classes Workshop"
// todo: add a clear all button
// todo: link your socials
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
    let skill_level = data.skill_level;

    let date = new Date().toDateString();
    let details = `${name} , ${date} , ${skill_level}`;
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
    let date = document.getElementById("date").value;
    let skill_level = document.getElementById("skill_level").value;

    // validating the date input
    let current_date = new Date();
    let input_date = new Date(date);

    input_date = input_date.getTime();
    current_date = current_date.getTime();

    let invalid_name = name == "";
    let invalid_date = input_date > current_date;
    let isError = false;

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
        "date": date,
        "skill_level": skill_level
    };

    // +1 because youof 0 indexing and the variable is just under the createBooking()
    // which is used to increase the value of active_bookings
    let id = active_bookings + 1;
    booking_id = `booking${id}`;
    console.log(booking_id);
    createBooking(data, booking_id);

}

// this function doesn't need to wait for the submit button to be pressed
function autoDate() {
    // automically set the current date
    let currentDate = new Date().toJSON().slice(0, 10);
    document.getElementById("date").value = currentDate;
}
autoDate();

document.getElementById("submit_button").addEventListener("click", getBookingDetails);

function test_input() {
    document.getElementById("name").value = "Emmanuel Koledoye";
    document.getElementById("skill_level").value = "Advanced";
}

// ! for testing only comment out or delete later
// test with name1, name2, etc and rmeove duplication and placement issues
test_input()