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

var button_pressed = false;
function toggleButtonStyle(styleName) {
    var rows = document.querySelectorAll('.tr-hover');
    var styles = ["modify", "deleteSome", "deleteAll", "sync"];
    for (let i = 0; i < styles.length; i++) {
        rows.forEach(r => r.classList.remove(styles[i]));
        rows.forEach(r => r.classList.remove(`${styles[i]}_active`));
    }

    button_pressed = true;

    if (bookingData() != undefined) {
        rows.forEach(r => r.classList.add(styleName));
        document.getElementById(styleName).classList.toggle(`${styleName}_active`);
    }
}

function SyncPulse() {
    if (bookingData() != undefined) {
        document.getElementById("sync").classList.toggle("sync_pulse");
        console.log("sync needed");
    }
}

let data = {
    "name": "Person",
    "email": "example@gmail.com",
    "card_number": "1111 2222 3333 5555",
    "expiry_date": "10/28",
    "cvc": "123",
    "time": "17:00",
    "date": "20-11-2023",
    "skill_level": "Advanced"
};

// todo: remember to convert json parameter into valid json so use json.stringify
function autoFill(data) {
    let id_desc = ["name", "email", "card_number", "expiry_date", "cvc", "time", "date", "skill_level"];

    for (let i = 0; i < id_desc.length; i++) {
        let key = id_desc[i];
        let value = data[key];

        data[key] = value;
        console.log(key, value);
        document.getElementById(key).value = value;
    }
}

var collected_bookings = [];
var marked_ids = [];

async function getElemId(row) {
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

    var id = bookingInfo.id;

    // don't add duplicates
    // todo: check if a button has been pressed first

    if (!marked_ids.includes(id)) {
        collected_bookings.push(JSON.stringify(bookingInfo));
        marked_ids.push([id, row.rowIndex]);
    }

    console.log(button_pressed);
}

// todo: create a /modify/id_page
let modify_button = document.getElementById("modify");
modify_button.addEventListener("click", async () => {
    toggleButtonStyle("modify");
    SyncPulse();

    await fetch("http://localhost:3000/modify", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(collected_bookings)
    });

});

document.getElementById("sync").addEventListener("click", async () => {
    toggleButtonStyle("sync");

    await fetch("http://localhost:3000/viewBookings", {
        method: "GET"
    });

    location.reload();
});


document.getElementById("deleteSome").addEventListener("click", () => {
    toggleButtonStyle("deleteSome");
    SyncPulse();
});


document.getElementById("deleteAll").addEventListener("click", async () => {
    toggleButtonStyle("deleteAll");
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