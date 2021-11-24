const Delivery = require("../models/deliveries");

// get Deliveries from DB
const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json({success: true, data: deliveries});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Deliveries from DB with phone_number
const getDelivery = async (req, res) => {
    const phone = req.params.phone;
    try {
        const deliveries = await Delivery.find({phone_number: phone});
        res.status(200).json({success: true, data: deliveries});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add Delivery to DB
const postDelivery = async (req, res) => {
    try {
        const {phone_number} = req.body;
        const {detail} = req.body;
        const {address} = req.body;
        const {receiving_time} = req.body;

        const newDelivery = new Delivery({
            phone_number: phone_number,
            detail: detail,
            address: address,
            receiving_time: receiving_time
        });

        const savedDelivery = await newDelivery.save();
        res.status(201).json({success: true, data: savedDelivery});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postDelivery,
    getDeliveries,
    getDelivery
}