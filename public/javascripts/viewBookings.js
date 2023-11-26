

function AllbookingData() {
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
    });

    all_boookings.push(bookingInfo);
    return JSON.stringify(bookingInfo);
}

function rowSelectionStyle(style, index) {
    if (index != undefined) {
        var table = document.getElementById("booking_details");
        table.rows[index].classList.toggle(style);
        table.rows[index].classList.toggle(`${style}_selected`);
    }
}

function getID(selected_row) {
    let table = document.getElementById("booking_details");
    let rowElement = table.rows[selected_row]

    return rowElement.cells[0].innerText;
}

function toggleButtonStyle(styleName) {
    var rows = document.querySelectorAll('.tr-hover');

    var styles = ["modify", "deleteSome", "deleteAll", "sync"];
    for (let i = 0; i < styles.length; i++) {
        rows.forEach(r => r.classList.remove(styles[i]));
        rows.forEach(r => r.classList.remove(`${styles[i]}_active`));
    }


    if (AllbookingData() != undefined) {
        rows.forEach(r => r.classList.add(styleName));
        document.getElementById(styleName).classList.toggle(`${styleName}_active`);
    }
}

function hideButtonStyle(styleName) {
    document.getElementById(styleName).classList.remove(`${styleName}_active`);
}

// ! global
// is prefered over AllBookingInfo() because collected_bookings is filtered
var collected_bookings = [];
var button_pressed;

var marked_ids = [];

var selected_row;

var modify_pressed = false;
var deleteSome_pressed = false;
var deleteAll_pressed = false;

function selectBooking(rowElement) {
    var bookingInfo = {
        id: rowElement.cells[0].innerText,
        whenBooked: rowElement.cells[1].innerText,
        name: rowElement.cells[2].innerText,
        email: rowElement.cells[3].innerText,
        cardNumber: rowElement.cells[4].innerText,
        expiryDate: rowElement.cells[5].innerText,
        cvc: rowElement.cells[6].innerText,
        time: rowElement.cells[7].innerText,
        date: rowElement.cells[8].innerText,
        skillLevel: rowElement.cells[9].innerText
    };

    bookingInfo = JSON.stringify(bookingInfo);

    // ! Note: that selected_row is zero indexed but the 0th row is the ID, when booked, name email, etc...
    selected_row = rowElement.rowIndex;
    let current_id = getID(selected_row);

    console.log("selected_row: ", selected_row);

    if (modify_pressed) {
        rowSelectionStyle("modify", selected_row);
    }
    if (deleteSome_pressed) {
        rowSelectionStyle("deleteSome", selected_row);
    }
    if (deleteAll_pressed) {
        rowSelectionStyle("deleteAll", selected_row);
    }

    button_pressed = modify_pressed || deleteSome_pressed || deleteAll_pressed;
    console.log("button_pressed: ", button_pressed);
    if (button_pressed) {
        // to select row
        // ? keep in mind that you only need to select one row for MODIFY
        if (!marked_ids.includes(current_id) && !collected_bookings.includes(bookingInfo)) {
            collected_bookings.push(bookingInfo);
            marked_ids.push(getID(selected_row));
        }

        // to unselect a row
        else if (marked_ids.includes(current_id)) {
            marked_ids = marked_ids.filter((id) => {
                return current_id != id;
            });

            collected_bookings = collected_bookings.filter((booking) => {
                return booking != bookingInfo;
            });
            console.log(marked_ids);
        }
    }
}

function syncPulse() {
    document.getElementById("sync").classList.toggle("sync_pulse");
}

document.getElementById("sync").addEventListener("click", async () => {
    let valid_bookings = collected_bookings.length > 0;
    if (valid_bookings) {
        if (modify_pressed) {
            await fetch("http://localhost:3000/modify", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collected_bookings)
            });

        }

        if (deleteSome_pressed) {

            await fetch("http://localhost:3000/deleteSome", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(marked_ids)
            });
        }

        if (deleteAll_pressed) {
            // the back end doesn't need a parameter as it is deleteing all the records
            // so AllbookingData() won't be sent the req.body 

            await fetch("http://localhost:3000/deleteAll", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collected_bookings)
            });
        }
        syncPulse();
    }
});

// todo: create a /modify/id_page
let modify_button = document.getElementById("modify");
modify_button.addEventListener("click", async () => {
    toggleButtonStyle("modify");
    hideButtonStyle("deleteSome");
    hideButtonStyle("deleteAll");
    modify_pressed = true;
    deleteSome_pressed = false;
    deleteAll_pressed = false;
});

document.getElementById("deleteSome").addEventListener("click", async () => {
    hideButtonStyle("modify");
    toggleButtonStyle("deleteSome");
    hideButtonStyle("deleteAll");
    deleteSome_pressed = true;
    deleteAll_pressed = false;
    modify_pressed = false;
});

document.getElementById("deleteAll").addEventListener("click", async () => {
    hideButtonStyle("modify");
    hideButtonStyle("deleteSome");
    toggleButtonStyle("deleteAll");
    deleteAll_pressed = true;
    modify_pressed = false;
    deleteSome_pressed = false;
});