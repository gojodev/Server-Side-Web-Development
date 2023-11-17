// console.log(axios);/

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

document.getElementById("deleteAll").addEventListener("click", () => {
    toggleButtonStyle("deleteAll");


});

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
    console.log(bookingInfo)
    await fetch("http://localhost:3000/deleteAll", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingInfo)
    });

    // Log the JSON object to the consoledele
    console.log(JSON.stringify(bookingInfo, null, 2));
}