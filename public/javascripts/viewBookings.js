function hideBookings() {
    for (let i = 0; i < 4; i++) {
        booking_id = `booking${i + 1}`;
        let isHiden = document.getElementById(booking_id).classList.contains("hide");
        if (!isHiden) {
            document.getElementById(booking_id).classList.toggle("hide");
        }
    }

    // must reset the active bookings to zero after the purge
    active_bookings = 0;
}


// ! hides the booking details before the page laods
hideBookings();

// todo: add card details
function fillInfo(name, email, date, skill_level, card_number, expiry_date, cvc) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("skill_level").value = skill_level;
    document.getElementById("card_number") = card_number;
    document.getElementById("expiry_date") = expiry_date;
    document.getElementById("cvc") = cvc;
    document.getElementById("date") = date;
}

// will added to the functions once the getBookingDetails and validation is working properly
// ! this will also delete bookings
function modifyBooking() {

}

function deleteAllBookings() {
    // reset input fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    autoDate();
    document.getElementById("skill_level").value = "Beginner";

    // hide booking output/preview
    hideBookings();
}

document.getElementById("clear_all").addEventListener("click", deleteAllBookings);