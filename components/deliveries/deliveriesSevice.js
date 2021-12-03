const Delivery = require("../../models/deliveries");

const query = (filter = {}) => Delivery.find(filter);

// add Delivery to DB
const save = async (req) => {
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

    return await newDelivery.save();
};

module.exports = {
    query,
    save
}