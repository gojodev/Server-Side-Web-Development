// firebase hosting:channel:deploy preview (at root) was only used to share progress

/**
 * because we aren't using authenication which means there are no login pages every user can access other user's details
 * so by extension it should be okay to generate IDs on the client side
 */
import { nanoid } from "nanoid";

function error_msg(message, element_ids) {
    for (let i = 0; i < element_ids.length; i++) {
        document.getElementById(element_ids[i]).classList.toggle("error_borders");
    }

    document.getElementById("error_section").classList.toggle("hide");
    document.getElementById("error_text").innerHTML = message;
    console.log(message); // ! helps with debugging and will be removed later
}

// ! hide the error seciton for when the page lodas
document.getElementById("error_section").classList.toggle("hide");

// ! GLOBAL
// the boolean value helpt so check if the function has already run so that the user won't have to see error messages before they can even input anything
let isFirstRun = false;

// no .value because i'm using event listeners and will later get their value
let card_number = document.getElementById("card_number");
var expiry_date = document.getElementById("expiry_date");

// ! CARD DETAILS ------------------

card_number.addEventListener("input", () => card_number.value = formatNumber(card_number.value.replaceAll(" ", "")));

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
    if (index !== 0 && index % 4 == 0) seed += " ";
    return seed + next;
}, "");
// add a slash automically for the expiry date inbetween the 2nd and 3rd number
expiry_date.addEventListener("input", () => expiry_date.value = slasher(expiry_date.value.replaceAll(" ")));

const slasher = (number) => number.split("").reduce((seed, next, index) => {
    let date = new Date();
    var input_expiry_date = expiry_date.value;

    if (index % 2 == 0 && index !== 0 && !input_expiry_date.includes("/")) {
        seed += "/";
    }

    let input_data = input_expiry_date.split("/");

    let inputMonth = Number(input_data[0]);
    let inputYear = Number(input_data[1]);
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed.

    let valid_date = (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth));
    if (!valid_date) {
        error_msg("Invalid Expiry Date", ["expiry_date"]);
    }
    // will still return regardless so that the user can see what went wrong at least
    return seed + next;
}, "");

// ! CARD DETAILS ------------------

function getBookingDetails() {
    // express js will collect the values using the name attribute and req.body so they don't need to be collected here
    isFirstRun = true;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;

    document.getElementById("id_tag").value = nanoid();

    let current_date = new Date();
    let input_date = new Date(date);

    console.log("current_date: ", current_date);
    document.getElementById("when_booked").value = current_date.toLocaleString('en-GB');

    let input_date_time = input_date.getTime();
    let current_date_time = current_date.getTime();

    let invalid_name = name == "";
    let invalid_date = !(input_date_time >= current_date_time);
    let invalid_email = !(email.includes("@") && email.includes("."));

    let isError = false;

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

    if (isError) {
        error_msg("Something went wrong :(", ["create_container"]);
    }
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

if (isFirstRun) {
    getBookingDetails();
}

document.getElementById("submit_button").addEventListener("click", getBookingDetails);

// ! make sure this function doesn't overwite autoFill()
function autoDate() {
    // automically set the current date
    let today = new Date().toJSON().slice(0, 10);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toJSON().slice(0, 10);
    document.getElementById("date").value = tomorrow;
    // return tomorrow;
}
autoDate();

// let data = {
//     "name": "Emmanuel Koledoye",
//     "email": "example@gmail.com",
//     "card_number": "1111 2222 3333 5555",
//     "expiry_date": "10/28",
//     "cvc": "123",
//     "time": "17:00",
//     "date": autoDate(),
//     "skill_level": "Advanced"
// };

// ! only used for debugging
// autoFill(data);