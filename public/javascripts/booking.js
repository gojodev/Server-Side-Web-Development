// ? add a validation file?
// todo: add a little x button at the top of the summarised booking details in the modify and delete section
// todo: setup mongoDB
// todo: add a favicon

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

    console.log("valid_date: ", valid_date);
    console.log("valid_inputs: ", valid_inputs);

    let data = {
        "name": name,
        "date": date,
        "skill_level": skill_level
    };

    // ! send this to MongoDB later
    return data;
}

// this function doesn't need to wait for the submit button to be pressed
function autoDate() {
    // automically set the current date
    let currentDate = new Date().toJSON().slice(0, 10);
    document.getElementById("date").value = currentDate;
}
autoDate();

function createBooking() {
    
}

// ! this will also delete bookings
// you will need event listeners
function modifyBooking() {

}

document.getElementById("submit_button").addEventListener("click", getBookingDetails);

function test_input() {
    document.getElementById("name").value = "Emmanuel Koledoye";
    document.getElementById("skill_level").value = "Advanced";
}

// ! for testing only comment out or delete later
test_input()