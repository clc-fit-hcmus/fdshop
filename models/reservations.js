const mongoose = require("mongoose");

const Reservation = new mongoose.Schema({
    phone_number: {
        type: String,
        required: true
    },

    peoples: {
        type: Number,
        required: true,
        default: 1
    },

    when: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("reservations", Reservation);