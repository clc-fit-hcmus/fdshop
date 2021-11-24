const mongoose = require("mongoose");
const {Information} = require("../models/information")
const {Login} = require("../models/login")

const Person = new mongoose.Schema({
    login: {
        type: Login,
        required: true
    },

    info: {
        type: Information,
        required: true
    }
});

module.exports = mongoose.model("persons", Person);