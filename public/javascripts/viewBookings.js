const DarkReader = require('darkreader');
DarkReader.setFetchMethod(window.fetch);
DarkReader.auto();

const Fuse = require('fuse.js')

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
            cvv: r.cells[6].innerText,
            time: r.cells[7].innerText,
            date: r.cells[8].innerText,
            skillLevel: r.cells[9].innerText
        };
        all_boookings.push(bookingInfo);
    });

    return all_boookings;
}

function rowSelectionStyle(style, index) {
    var table = document.getElementById("booking_details");
    if (index != undefined) {
        if (style == "modify") {
            // remove the toggle style from all the other rows
            var rows = document.querySelectorAll('.tr-hover');
            rows.forEach(r => r.classList.add("modify"));
            rows.forEach(r => r.classList.remove("modify_selected"));

            // then just add the toggle style to the selected row
            table.rows[index].classList.toggle(style);
            table.rows[index].classList.toggle(`${style}_selected`);
        }
        else {
            table.rows[index].classList.toggle(style);
            table.rows[index].classList.toggle(`${style}_selected`);
        }
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
        rows.forEach(r => r.classList.toggle(styleName));
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

export function selectBooking(rowElement) {
    var bookingInfo = {
        id: rowElement.cells[0].innerText,
        whenBooked: rowElement.cells[1].innerText,
        name: rowElement.cells[2].innerText,
        email: rowElement.cells[3].innerText,
        cardNumber: rowElement.cells[4].innerText,
        expiryDate: rowElement.cells[5].innerText,
        cvv: rowElement.cells[6].innerText,
        time: rowElement.cells[7].innerText,
        date: rowElement.cells[8].innerText,
        skillLevel: rowElement.cells[9].innerText
    };

    bookingInfo = JSON.stringify(bookingInfo);

    // ! Note: that selected_row is zero indexed but the 0th row is the ID, when booked, name email, etc...
    selected_row = rowElement.rowIndex;
    let current_id = getID(selected_row);

    // todo: only allow one row to be select at a time
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
        let rowID = getID(selected_row);
        if (!marked_ids.includes(current_id) && !collected_bookings.includes(bookingInfo)) {
            // only select one id and row information at a time if modift button is pressed
            if (modify_pressed) {
                collected_bookings = [bookingInfo];
                marked_ids = [rowID];
            }
            else {
                collected_bookings.push(bookingInfo);
                marked_ids.push(rowID);
            }
        }

        // to unselect a row
        else if (marked_ids.includes(current_id)) {
            marked_ids = marked_ids.filter((id) => {
                return current_id != id;
            });

            collected_bookings = collected_bookings.filter((booking) => {
                return booking != bookingInfo;
            });
        }
    }
}

function syncPulse() {
    document.getElementById("sync").classList.add("sync_pulse");
}

document.getElementById("sync").addEventListener("click", async () => {
    if (modify_pressed) {
        await fetch("http://localhost:3000/modify", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: collected_bookings
        });

        location.replace('http://localhost:3000/modify');
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
        await fetch("http://localhost:3000/deleteAll", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // ! sometimes you have to do a hard refresh (empty cache and refresh)
    // for the page to load itself and make sure that no google extensions are interfering
    if (deleteSome_pressed || deleteAll_pressed) {
        location.reload(true);
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
    syncPulse();
});

document.getElementById("deleteSome").addEventListener("click", async () => {
    hideButtonStyle("modify");
    toggleButtonStyle("deleteSome");
    hideButtonStyle("deleteAll");
    deleteSome_pressed = true;
    deleteAll_pressed = false;
    modify_pressed = false;
    syncPulse();    	
});

document.getElementById("deleteAll").addEventListener("click", async () => {
    hideButtonStyle("modify");
    hideButtonStyle("deleteSome");
    toggleButtonStyle("deleteAll");
    deleteAll_pressed = true;
    modify_pressed = false;
    deleteSome_pressed = false;
    syncPulse();
});

function clearTable() {
    var table = document.getElementById('booking_details');
    // Remove all rows except the header
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function clickListner() {
    var tableRows = document.querySelectorAll('.tr-hover');
    tableRows.forEach((row) => {
        row.addEventListener('click', () => {
            selectBooking(row);
        });
    });
}

function renderResults(results, query) {
    var table = document.getElementById('booking_details');
    var current_booking;
    results.forEach((booking) => {
        var row = table.insertRow(-1);
        row.classList.toggle('tr-hover');
        if (booking.item != undefined) {
            current_booking = booking.item
        }
        else {
            current_booking = booking;
        }
        for (let key in current_booking) {
            let cell = row.insertCell();
            let value = current_booking[key]
            cell.innerHTML = value;

            if (query != null) {
                query = query.toLowerCase();
                value = value.toLowerCase();

                if (query.includes(value) || value == query) {
                    cell.style.color = 'green';
                }
            }
        }

    });
}

// this value won't be changed unlike the AlbookingData()
var all_bookings = AllbookingData();

let searchbar = document.getElementById('searchbar');
searchbar.addEventListener('input', () => {
    let query = searchbar.value;

    if (query !== '') {
        searchbar.classList.add('searchbar_selected');

        const fuse = new Fuse(all_bookings, {
            keys: ['id', 'name', 'email', 'cvv', 'skillLevel']
        });

        let results = fuse.search(query);

        clearTable();

        renderResults(results, query);

        clickListner();
    }

    else {
        // If the search input is empty, restore the original table
        searchbar.classList.remove('searchbar_selected')
        clearTable();
        renderResults(all_bookings, null);
        clickListner();
    }
});


clickListner();