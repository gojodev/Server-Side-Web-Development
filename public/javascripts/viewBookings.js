function bookingData() {
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
    return bookingInfo;
}

function rowSelectionStyle(style, index) {
    if (index != undefined) {
        var table = document.getElementById("booking_details");
        table.rows[index].classList.toggle(style);
        table.rows[index].classList.toggle(`${style}_selected`);
    }
}

function getAllRowData(selected_row) {
    let table = document.getElementById("booking_details");
    let rowElement = table.rows[selected_row];

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

    return bookingInfo;
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


    if (bookingData() != undefined) {
        rows.forEach(r => r.classList.add(styleName));
        document.getElementById(styleName).classList.toggle(`${styleName}_active`);
    }
}

function hideButtonStyle(styleName) {
    document.getElementById(styleName).classList.remove(`${styleName}_active`);
}

// ! global
var bookingCount = 0;
var rows = document.querySelectorAll('.tr-hover');
bookingCount = rows.length;

var collected_bookings = [];
var button_pressed;

// ! these are not zero indexed
// the orignal order of indexes that MongoDB has
// ! have have to replace thesse with the _id for Mongo in which case there will be no need for Og_indexes
var OG_indexes = [];
// the order table rows (techically reversed from what MongoDB has)
var marked_row = [];

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

    // ! Note: that selected_row is zero indexed but the 0th row is the ID, when booked, name email, etc...
    selected_row = rowElement.rowIndex;

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
    if (button_pressed) {
        // to select row
        // ? keep in mind that you only need to select one row for MODIFY
        if (!marked_row.includes(selected_row)) {
            collected_bookings.push(JSON.stringify(bookingInfo));
            marked_row.push(selected_row);

            marked_row.filter((r) => {
                var og_index = bookingCount - r;
                if (!OG_indexes.includes(og_index)) {
                    OG_indexes.push(og_index);
                }
            });
        }

        // to unselect a row
        else if (marked_row.includes(selected_row)) {
            marked_row = marked_row.filter((current_row) => {
                return current_row != selected_row;
            });

            OG_indexes = OG_indexes.filter((current_row) => {
                // convert to an OG index
                current_row = bookingCount - current_row;
                return current_row !== selected_row;
            });
        }

        SyncPulse();
        console.log(marked_row, OG_indexes);
    }
}

//1 2 3 4 5 (OG, not zero indexed)
//5 4 3 2 1 (reversed, not zero indexed)
//0 1 2 3 4 (OG order)
//4 3 2 1 0 (reversed order)

function SyncPulse() {
    if (selected_row != undefined) {
        document.getElementById("sync").classList.toggle("sync_pulse");
    }
}

document.getElementById("sync").addEventListener("click", async () => {

    if (modify_pressed) {
        await fetch("http://localhost:3000/modify", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(collected_bookings)
        });
    }

    else if (deleteSome_pressed) {
        await fetch("http://localhost:3000/deleteSome", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(collected_bookings)
        });
    }

    else if (deleteAll_pressed) {
        let bookingInfo = bookingData();

        if (bookingInfo != undefined) {
            SyncPulse();
            await fetch("http://localhost:3000/deleteAll", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingInfo)
            });
        }
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
    marked_row = [];
    hideButtonStyle("modify");
    toggleButtonStyle("deleteSome");
    hideButtonStyle("deleteAll");
    deleteSome_pressed = true;
    deleteAll_pressed = false;
    modify_pressed = false;

    let bookingInfo = [];
    OG_indexes.filter((current) => {
        bookingInfo.push(getAllRowData(current));
    });

    if (OG_indexes.length > 0) {
        await fetch("http://localhost:3000/deleteAll", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        });
    }
});


document.getElementById("deleteAll").addEventListener("click", async () => {
    hideButtonStyle("modify");
    hideButtonStyle("deleteSome");
    toggleButtonStyle("deleteAll");
    deleteAll_pressed = true;
    modify_pressed = false;
    deleteSome_pressed = false;
});

// toggleButtonStyle("sync");

// await fetch("http://localhost:3000/viewBookings", {
//     method: "GET"
// });

// location.reload();