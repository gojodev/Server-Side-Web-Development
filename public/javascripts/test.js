const nanoid = require("nanoid");
const mongoose = require('mongoose');

/**
 * 
 * @param {JSON} data 
 */
async function createBooking(data) {
    mongoose.connect('mongodb://127.0.0.1:27017/BookingDB')
        .then(() => console.log('Connected!'));

    const Schema = mongoose.Schema;

    const BookingSchema = new Schema({
        id: { type: String, set: data.id },
        name: { type: String, set: data.name },
        email: { type: String, set: data.email },
        card_number: { type: String, set: data.card_number },
        expiry_date: { type: String, set: data.expiry_date },
        cvc: { type: String, set: data.cvc },
        time: { type: String, set: data.time },
        date: { type: Date, set: data.date },
        skill_level: { type: String, set: data.skill_level },
    });

    const BookingModel = mongoose.model('bookings', BookingSchema);

    const m = new BookingModel();
    await m.save();
}

let data = {
    "id": nanoid(),
    name: "Emmanuel Koledoye",
    email: "example@gmail.com",
    card_number: "1111 2222 3333 5555",
    expiry_date: "10/28",
    cvc: "123",
    time: "17:00",
    date: "2023-10-31",
    skill_level: "Advanced"
};

createBooking(data);