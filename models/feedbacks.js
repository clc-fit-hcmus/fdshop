const mongoose = require("mongoose");

const Feedback = new mongoose.Schema({
    who: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    feedback: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("feedbacks", Feedback);