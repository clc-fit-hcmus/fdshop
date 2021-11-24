const mongoose = require("mongoose");

const Detail = new mongoose.Schema({
    fd_name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        default: null
    }
});

module.exports = {
    Detail
}