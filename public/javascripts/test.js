
let booking = {
    id_tag: "vS8D29GRy3E0btWFGesoQ",
    name: "Emmanuel Koledoye",
    email: "example@gmail.com",
    card_number: "1111 2222 3333 5555",
    expiry_date: "10/28",
    cvc: "123",
    time: ":00",
    date: "2023-10-31",
    skill_level: "Advanced"
};


let str_acc = "";
let id_desc = ["id_tag", "name", "email", "card_number", "expiry_date", "cvc", "time", "date", "skill_level"];
for (let i = 0; i < id_desc.length; i++) {
    let key = id_desc[i];
    let value = booking[key];

    str_acc += `<strong>ID:</strong> ${value}<br>`;
}

console.log(str_acc);