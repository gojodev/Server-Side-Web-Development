// ? add a validation file?
// todo: setup mongoDB
// todo: make the slash red for the expiry date input
// todo: run your website with express instead of using live server (even in development)


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

    active_bookings++;
    let booking = document.getElementById(booking_id);
    booking.innerHTML = details;
    booking.classList.toggle("hide");
}

function getBookingDetails() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let skill_level = document.getElementById("skill_level").value;

    // validating the date input
    let current_date = new Date();
    let input_date = new Date(date);

    input_date_time = input_date.getTime();
    current_date_time = current_date.getTime();

    let invalid_name = name == "";
    let invalid_date = !(input_date_time >= current_date_time);
    let invalid_email = !(email.includes("@") && email.includes("."));

    let isError = false;
    input_date = input_date.toDateString();

    // todo: validate email input

    // i'm not using switch cases because i'm using different expressions
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
        createBooking(data, booking_id);
    }

}

document.getElementById("submit_button").addEventListener("click", getBookingDetails);

// this function doesn't need to wait for the submit button to be pressed
function autoDate() {
    // automically set the current date
    let today = new Date().toJSON().slice(0, 10);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toJSON().slice(0, 10);
    document.getElementById("date").value = tomorrow;
}
autoDate();

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

function getCardDetails() {
    let name = document.getElementById("name").value;
    let card_number = document.getElementById("card_number");
    let expiry_date = document.getElementById("expiry_date");
    let cvc = document.getElementById("cvc").value;


    // add spaces between every 4 numbers for card number input
    // ! cause i wanna write my own one
    let counter = 0;
    card_number.addEventListener("input", () => {
        counter++;
        let number = card_number.value;
        let length = number.toString().length;
        console.log("length: ", length);
        if (counter % 4 == 0 ) {
            // convert to array
            number = number.split("")
            number.splice(length, 0, " ");
            number = number.toString().replaceAll(",", "");
            console.log("number: ", number)
            card_number.value = number;
            counter = 0;
        }
        
    });

    // add a slash automically for the expiry date
    expiry_date.addEventListener("input", () => {
        let date = expiry_date.value.split("");

        if (date.length == 2) {
            // todo:  make the slash red (possible?)
            // let slash = `<strong strong class='red'> / </strong>`
            date.splice(2, 0, "/");
            date = date.toString().replaceAll(",", "");
            console.log(date);
            expiry_date.value = date.toString();
        }
    });

    name = name

    let cardData = {
        "name": name,
        "card_number": card_number,
        "expiry_date": expiry_date,
        "cvc": cvc
    };

    // console.log("Card Data: ", cardData);
}


getCardDetails();