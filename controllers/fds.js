const FD = require("../models/fds");

// add FD to DB
const postFDs = async (req, res) => {
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
    postFDs
}