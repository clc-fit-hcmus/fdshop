const mongoose = require("mongoose");

const Information = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    date_of_birth: {
        type: Date,
        required: true
    },

    sex: {
        type: String,
        require: true
    },

    ssn: {
        type: String,
        default: null
    },

    citizenship: {
        type: String,
        default: null
    },

    email: {
        type: String,
        default: null
    },

    phone_number: {
        type: String,
        required: true
    },

    address: {
        type: String,
        default: null
    }
});

module.exports = {
    Information
}