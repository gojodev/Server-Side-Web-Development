function error_msg(message, element_ids) {
    /**
     * the reason why this is a for loop is out of good practce for if i
     * were to edit multople html elements for a single edit
     * in my case i didn't need to but i left the option there cause i could
     */
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

card_number.addEventListener("input", () => {
    const cleanedValue = card_number.value.replace(/\D/g, ''); // Remove non-numeric characters
    card_number.value = formatNumber(cleanedValue);
});

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
    if (index !== 0 && index % 4 == 0) seed += " ";
    return seed + next;
}, "");

// add a slash automically for the expiry date inbetween the 2nd and 3rd number
expiry_date.addEventListener("input", () => expiry_date.value = slasher(expiry_date.value.replaceAll(" ")));

const slasher = (number) => number.split("").reduce((seed, next, index) => {
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
var current_date = new Date();
document.getElementById("when_booked").value = current_date.toLocaleString('en-GB');
function getBookingDetails() {
    // express js will collect the values using the name attribute and req.body so they don't need to be collected here
    // this also means that I don't have to make a post request in this script as it has already been done in the html page
    // with the form i mean just access the info using req.body on the server side
    isFirstRun = true;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;

    let input_date = new Date(date);

    

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

// eslint-disable-next-line no-unused-vars
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

// So i don't need to create 2 scripts for the same functionaility
// --------
let submit_button = document.getElementById("submit_button");
var inputElement = document.querySelector('input');
if (submit_button != null) {
    inputElement.style.color = '#007acc';
    submit_button.addEventListener("click", getBookingDetails);
}

let modify_button = document.getElementById("modify_button");
if (modify_button != null) {
    inputElement.style.color = 'orange';
    modify_button.addEventListener("click", getBookingDetails);
}
// -------

function autoDate() {
    // automically set the current date
    let today = new Date().toJSON().slice(0, 10);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toJSON().slice(0, 10);
    // document.getElementById("date").value = tomorrow;
    return tomorrow;
}
autoDate();

// let data = {
//     "name": "PersonX",
//     "email": "exampleX@gmail.com",
//     "card_number": "1111 2222 3333 5555",
//     "expiry_date": "10/28",
//     "cvc": "123",
//     "time": "17:00",
//     "date": autoDate(),
//     "skill_level": "Advanced"
// };

// // ! only used for debugging
// autoFill(data);