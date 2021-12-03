const {query, save} = require("./deliveriesSevice");

// get Deliveries from DB
const getDeliveries = async (req, res) => {
    try {
        const deliveries = await query();
        res.status(200).json({success: true, data: deliveries});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Deliveries from DB with phone_number
const getDelivery = async (req, res) => {
    const phone = req.params.phone;
    try {
        const deliveries = await query({phone_number: phone});
        res.status(200).json({success: true, data: deliveries});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add Delivery to DB
const postDelivery = async (req, res) => {
    try {
        const savedDelivery = await save(req);
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