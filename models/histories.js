const mongoose = require("mongoose");

const History = new mongoose.Schema({
    who: {
        type: String,
        required: true
    },

    when: {
        type: Date,
        required: true,
        default: Date.now
    },

    what: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("histories", History);