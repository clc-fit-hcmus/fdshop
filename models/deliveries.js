const mongoose = require("mongoose");
const {Detail} = require("../models/detail");

const Delivery = new mongoose.Schema({
    phone_number: {
        type: String,
        required: true
    },

    detail: {
        type: [Detail],
        required: true
    },

    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("deliveries", Delivery);