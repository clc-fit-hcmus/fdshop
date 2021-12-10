const mongoose = require("mongoose");

const Delivery = new mongoose.Schema({
    phone_number: {
        type: String,
        required: true
    },

    detail: [{
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
    }],

    address: {
        type: String,
        required: true
    },

    receiving_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("deliveries", Delivery);