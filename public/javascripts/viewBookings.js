function toggleButtonStyle(button, styleName) {
    // Remove the style class from all buttons
    var buttons = document.querySelectorAll('.booking_buttons');
    buttons.forEach(b => b.classList.remove(styleName));

    // Add the style class to the clicked button
    button.classList.add(styleName);
}

function logBookingInfo(row) {
    // Remove the 'active' class from all rows
    var rows = document.querySelectorAll('.tr-hover');
    rows.forEach(r => r.classList.remove('active'));

    // Add the 'active' class to the clicked row
    row.classList.add('active');

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

    // Log the JSON object to the consoledele
    console.log(JSON.stringify(bookingInfo, null, 2));
}