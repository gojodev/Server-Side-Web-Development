function toggleButtonStyle(styleName) {
    var rows = document.querySelectorAll('.tr-hover');
    rows.forEach(r => r.classList.remove("modify"));
    rows.forEach(r => r.classList.remove("deleteSome"));
    rows.forEach(r => r.classList.remove("deleteAll"));

    rows.forEach(r => r.classList.add(styleName));

    document.getElementById("modify").classList.remove("modify_active");
    document.getElementById("deleteSome").classList.remove("deleteSome_active");
    document.getElementById("deleteAll").classList.remove("deleteAll_active");

    document.getElementById(styleName).classList.toggle(`${styleName}_active`);
}

let modify_button = document.getElementById("modify");
modify_button.addEventListener("click", () => {
    toggleButtonStyle("modify");
});

document.getElementById("deleteSome").addEventListener("click", () => {
    toggleButtonStyle("deleteSome");

});

document.getElementById("deleteAll").addEventListener("click", async () => {
    toggleButtonStyle("deleteAll");
    var rows = document.querySelectorAll('.tr-hover');
    var all_boookings = [];
    var bookingInfo;
    rows.forEach(r => {
        bookingInfo = {
            id: r.cells[0].innerText,
            whenBooked: r.cells[1].innerText,
            name: r.cells[2].innerText,
            email: r.cells[3].innerText,
            cardNumber: r.cells[4].innerText,
            expiryDate: r.cells[5].innerText,
            cvc: r.cells[6].innerText,
            time: r.cells[7].innerText,
            date: r.cells[8].innerText,
            skillLevel: r.cells[9].innerText
        };

        all_boookings.push(bookingInfo);
    });


    await fetch("http://localhost:3000/deleteAll", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingInfo)
    });

    // ? add a sync button because you make the page reload to show changes
});

var marked_bookings = [];
// only add a booking into marked bookings if it has a different id to whats already in marked_ids
var marked_ids = [];
async function logBookingInfo(row) {
    // Create a JSON object with the information from the selected row
    var bookingInfo = {
        id: row.cells[0].innerText,
        whenBooked: row.cells[1].innerText,
        name: row.cells[2].innerText,
        email: row.cells[3].innerText,
        cardNumber: row.cells[4].innerText,
        expiryDate: row.cells[5].innerText,
        cvc: row.cells[6].innerText,
        time: row.cells[7].innerText,
        date: row.cells[8].innerText,
        skillLevel: row.cells[9].innerText
    };

    // JSON.stringify is used to add strings to the key of the JSON
    // so that it becomes a valid json object
    console.log(JSON.stringify(bookingInfo, null, 2));
}