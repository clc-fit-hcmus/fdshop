const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
})

module.exports = mongoose.model("Token", Token, "token");