// ? add a validation file?
// it may be tempteing to use esbuild and a bundler but use express js to request data from html
// todo: add a little x button at the top of the summarised booking details in the modify and delete section
// todo: setup mongoDB
// todo: add a favicon

// ! GLOBAL
let active_bookings = 0;

// will only display at max 4 bookings and hide the rest
function displayBookings() {
    let booking_id;

    for (let i = 0; i < not_booked; i++) {
        booking_id = `booking${i + 1}`;
        console.log("showing: ", booking_id);
        document.getElementById(booking_id).classList.toggle("show");
    }
}

// active_bookings = 2;
function hideBookings() {
    console.log("active bookings: ", active_bookings);
    if (active_bookings == 0) {
        for (let i = 0; i < 4; i++) {
            booking_id = `booking${i + 1}`;
            console.log("hiding: ", booking_id);
            document.getElementById(booking_id).classList.toggle("hide");
        }
    }
    else {
        for (let i = 0; i < active_bookings; i++) {
            booking_id = `booking${4 - i}`;
            console.log("hiding: ", booking_id);
            document.getElementById(booking_id).classList.toggle("hide");
        }
    }
}


// ! GLOBAL
/**
 * 
 * @param {JSON} data 
 */
function createBooking(data) {
    let name = data.name;
    let date = data.date;
    let skill_level = data.skill_level;

    console.log("Booking added, active bookings: ", active_bookings);
    active_bookings++;
    let details = `${name},${date},${skill_level}`;
    console.log(details);
}


// ! this will also delete bookings
// you will need event listeners
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

    let valid_date = input_date >= current_date;
    let valid_inputs = !([name, date, skill_level].includes(""))

    // ! send this to MongoDB later
    let data = {
        "name": name,
        "date": date,
        "skill_level": skill_level
    };

    if (active_bookings < 5) {
        active_bookings++;
    }

    createBooking(data);
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