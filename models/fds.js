const mongoose = require("mongoose");

const FD = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    release_date: {
        type: Date,
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
        data: {
            type: Buffer,
            required: true
        },
        content_type: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model("FoodsAndDrinks", FD);