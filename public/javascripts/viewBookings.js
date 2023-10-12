// todo: remove the limits on the amount of bookings that can be placed
// todo: pull data from database to carry data across pages and insert it with express + ejs

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

//!  might be easier to use a json object instead of needing a fuck load of parameters
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