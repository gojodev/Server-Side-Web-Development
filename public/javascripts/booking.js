function error_msg(message, element_id) {
    document.getElementById(element_id).classList.toggle("error_borders");

    document.getElementById("error_section").classList.toggle("hide");
    document.getElementById("error_text").innerHTML = message;
}

// ! hide the error seciton for when the page lodas
document.getElementById("error_section").classList.toggle("hide");

// no .value because i'm using event listeners and will later get their value
let cardNumber = document.getElementById("cardNumber");
var expiryDate = document.getElementById("expiryDate");

cardNumber.addEventListener("input", () => {
    const cleanedValue = cardNumber.value.replace(/\D/g, ''); // Remove non-numeric characters
    cardNumber.value = formatNumber(cleanedValue);
    if (cardNumber.length != 19) {
        error_msg('Invalid Card Number Input', 'cardNumber');
    }
});

const formatNumber = (number) => number.split("").reduce((seed, next, index) => {
    if (index !== 0 && index % 4 == 0) seed += " ";
    return seed + next;
}, "");

// add a slash automically for the expiry date inbetween the 2nd and 3rd number
expiryDate.addEventListener("input", () => {
    expiryDate.value = slasher(expiryDate.value.replaceAll(" "));
});

const slasher = (number) => number.split("").reduce((seed, next, index) => {
    var input_expiryDate = expiryDate.value;

    if (index % 2 == 0 && index !== 0 && !input_expiryDate.includes("/")) {
        seed += "/";
    }

    let input_data = input_expiryDate.split("/");

    let inputMonth = Number(input_data[0]);
    let inputYear = Number(`20${input_data[1]}`);
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed.

    let valid_date = (inputYear >= currentYear && (currentYear <= inputYear && inputMonth >= currentMonth));
    if (valid_date == false) {
        error_msg("Invalid Expiry Date", "expiryDate");
    }
    // will still return regardless so that the user can see what went wrong at least
    return seed + next;
}, "");


var current_date = new Date();
document.getElementById("whenBooked").value = current_date.toLocaleString('en-GB');

let nameElem = document.getElementById('name');
nameElem.addEventListener('input', () => {
    if (nameElem.value == "") {
        error_msg("Invalid name input", "name");
    }
})

let emailElem = document.getElementById('email');
emailElem.addEventListener('input', () => {
    let email = emailElem.value;
    console.log('email: ', email);
    if (!(email.includes("@") && email.includes(".") || email != '')) {
        error_msg("Invalid email input", "email");
    }
})

let dateElem = document.getElementById('date');
dateElem.addEventListener('input', () => {
    let date = dateElem.value;
    let input_date = new Date(date);

    let input_date_time = input_date.getTime();
    let current_date_time = current_date.getTime();

    console.log(input_date_time, current_date_time, input_date_time - current_date_time)

    let valid_date = (input_date_time - current_date_time) >= 0;

    if (!valid_date) {
        error_msg("Invalid date", "date");
    }
})

let cvvElem = document.getElementById('cvv');
cvvElem.addEventListener('input', () => {
    if (cvvElem.value.length != 3) {
        error_msg('Invalid CVV', 'cvv');
    }
})


// eslint-disable-next-line no-unused-vars
function autoFill(data) {
    let id_desc = ["name", "email", "cardNumber", "expiryDate", "cvv", "time", "date", "skillLevel"];

    for (let i = 0; i < id_desc.length; i++) {
        let key = id_desc[i];
        let value = data[key];

        data[key] = value;
        document.getElementById(key).value = value;
    }
}

// So i don't need to create 2 scripts for the same functionaility
// --------

var inputTags = document.querySelectorAll('input');
if (window.location.href.includes('modify')) {
    inputTags.forEach((input) => {
        input.style.color = 'orange';
        console.log('input: ', input)
    })

    document.getElementById('modify_button').style.color = 'white';
    document.getElementById('clear_all').style.color = 'white';

}
else {
    inputTags.forEach((input) => {
        input.style.color = '#007acc';
    })

    document.getElementById('submit_button').style.color = 'white';
    document.getElementById('clear_all').style.color = 'white';
}

// -------

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

// Saves time in filling in data in the booking.js page

// let data = {
//     "name": "PersonA",
//     "email": "exampleA@gmail.com",
//     "cardNumber": "1111 2222 3333 5555",
//     "expiryDate": "10/28",
//     "cvv": "123",
//     "time": "17:00",
//     "date": autoDate(),
//     "skillLevel": "Advanced"
// };

// // ! only used for debugging
// autoFill(data);