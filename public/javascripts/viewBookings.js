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

function SyncPulse() {
    if (bookingData() != undefined) {
        document.getElementById("sync").classList.toggle("sync_pulse");
        console.log("sync needed");
    }
}

// ! global
var bookingCount = 0;
var rows = document.querySelectorAll('.tr-hover');
bookingCount = rows.length;

var collected_bookings = [];
var OG_indexes = [];
var marked_row = [];

var selected_row;

var modify_pressed = false;
var deleteSome_pressed = false;
var deleteAll_pressed = false;

// todo: fix row selection
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

    // to select row
    // ? keep in mind that you only need to select one row for MODIFY
    if (!marked_row.includes(selected_row)) {
        collected_bookings.push(JSON.stringify(bookingInfo));
        marked_row.push(selected_row);
    }


    // to unselect a row
    // if (marked_row.includes(selected_row)) {
    //     marked_row = marked_row.filter((current_row) => {
    //         return current_row != selected_row;
    //     });
    // }

    // this will prob moved
    OG_indexes = marked_row.filter((r) => {
        return bookingCount - (r + 1);
    });

}

document.getElementById("sync").addEventListener("click", async () => {
    toggleButtonStyle("sync");

    await fetch("http://localhost:3000/viewBookings", {
        method: "GET"
    });

    location.reload();
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

    await fetch("http://localhost:3000/modify", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(collected_bookings)
    });

    SyncPulse();
});

document.getElementById("deleteSome").addEventListener("click", () => {
    hideButtonStyle("modify");
    toggleButtonStyle("deleteSome");
    hideButtonStyle("deleteAll");
    deleteSome_pressed = true;
    deleteAll_pressed = false;
    modify_pressed = false;

    SyncPulse();
});


document.getElementById("deleteAll").addEventListener("click", async () => {
    hideButtonStyle("modify");
    hideButtonStyle("deleteSome");
    toggleButtonStyle("deleteAll");
    deleteAll_pressed = true;
    modify_pressed = false;
    deleteSome_pressed = false;

    var bookingInfo = bookingData();

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
});