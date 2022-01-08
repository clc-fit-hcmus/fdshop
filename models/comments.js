const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    when: {
        type: Date,
        default: Date.now
    },

    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("comments", Comment);