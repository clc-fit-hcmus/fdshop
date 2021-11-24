const FD = require("../models/fds");

// get FDs from DB
const getFDs = async (req, res) => {
    try {
        const fds = await FD.find();
        res.status(200).json({success: true, data: fds});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get FDs from DB with name
const getFD = async (req, res) => {
    const fdname = req.params.fdname;
    try {
        const fds = await FD.find({phone_number: fdname});
        res.status(200).json({success: true, data: fds});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add FD to DB
const postFD = async (req, res) => {
    try {
        const {name} = req.body;
        const {release_date} = req.body;
        const {is_best} = req.body;
        const {price} = req.body;
        const {discount} = req.body;
        const {description} = req.body;
        const {image} = req.body;

        const newFD = new FD({
            name: name,
            release_date: release_date,
            is_best: is_best,
            price: price,
            discount: discount,
            description: description,
            image: image
        });

        const savedFD = await newFD.save();
        res.status(201).json({success: true, data: savedFD});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postFD,
    getFDs,
    getFD
}