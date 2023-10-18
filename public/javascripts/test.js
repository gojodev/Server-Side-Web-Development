let data = {
    name: "Emmanuel Koledoye",
    email: "example@gmail.com",
    card_number: "1111 2222 3333 4444",
    expiry_date: "10/28",
    cvc: "123",
    time: "17:00",
    date: "31/10/2023",
    skill_level: "Advanced"
};

let id_desc = ["name", "email", "card_number", "expiry_date", "cvc", "time", "date", "skill_level"];

for (let i = 0; i < id_desc.length; i++) {
    let element_id = id_desc[i];
    console.log(data[element_id]);
}