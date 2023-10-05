// ? add a validation file?
// it may be tempteing to use esbuild and a bundler but use express js to request data from html
// todo: add a little x button at the top of the summarised booking details in the modify and delete section
// todo: setup mongoDB
// todo: add a favicon
// todo: imbetween the nav bar on the right and the logo on the left put "Coding Classes Workshop"

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
    console.log(message);
}

// hide the error section when the page loads
document.getElementById("error_section").classList.toggle("hide");

// will only display at max 4 bookings and hide the rest
function displayBookings() {
    let booking_id;

    for (let i = 0; i < not_booked; i++) {
        booking_id = `booking${i + 1}`;

        document.getElementById(booking_id).classList.toggle("show");
    }
}

// active_bookings = 2;
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


// ! GLOBAL
/**
 * 
 * @param {JSON} data 
 */
function createBooking(data, booking_id) {
    let name = data.name;
    let input_date = data.date;
    let skill_level = data.skill_level;

    let date = new Date().toDateString();
    let details = `${name} , ${date} , ${skill_level}`;
    // ! validation
    if (active_bookings < 5) {
        active_bookings++;
        let booking = document.getElementById(booking_id);
        booking.innerHTML = details;
        booking.classList.toggle("show");
    }
}


// ! this will also delete bookings
function modifyBooking() {

}

// ! hides the booking details before the page laods
hideBookings();

function getBookingDetails() {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let skill_level = document.getElementById("skill_level").value;

    // validating the date input
    let current_date = new Date();
    let input_date = new Date(date);

    input_date = input_date.getTime();
    current_date = current_date.getTime();

    let valid_date = input_date >= current_date && date.includes("");
    let valid_name = !name.includes("");
    let valid_skill_level = !skill_level.includes("");

    // not use switch cases because i'm using different expressions
    if (!valid_name) {
        error_msg("Invalid name input", ["name"]);
    }
    if (!valid_date) {
        error_msg("Invalid date", ["date"]);
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
    if (id < 5) {
        booking_id = `booking${id}`;
        createBooking(data, booking_id);
    }
    else {
        // ! validation
        let element_ids = ["create_container", "modify_container"];
        error_msg("you have booked more than 4 rooms.", element_ids);

        document.getElementById("error_section").classList.toggle("hide");
        document.getElementById("error_text").innerHTML = message;
    }
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
// test_input()