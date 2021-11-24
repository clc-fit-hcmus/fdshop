const mongoose = require("mongoose");

const FD = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    release_date: {
        type: Date,
        required: true,
        default: Date.now
    },

    is_best: {
        type: Boolean,
        require: true,
        default: false
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        required: true,
        default: 0
    },

    description: {
        type: String,
        required: true,
        default: null
    },

    image: {

    }
});

module.exports = mongoose.model("FoodsAndDrinks", FD);