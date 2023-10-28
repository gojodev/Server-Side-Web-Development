console.log("hello client side");
const ul = document.getElementById("ul");

// Loop through the booking data and create list items to display it
ul.forEach(booking => {
    const li = document.createElement("li");

    let str_acc = "";
    let id_desc = ["id_tag", "name", "email", "card_number", "expiry_date", "cvc", "time", "date", "skill_level"];
    for (let i = 0; i < id_desc.length; i++) {
        let key = id_desc[i];
        let value = booking[key];

        str_acc += `<strong>${key}</strong> <%= ${value} %> <br>`;
    }

    li.innerHTML = str_acc;
    ul.appendChild(li);
});


