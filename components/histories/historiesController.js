const {query, save} = require("./historiesService");

// get Histories from DB
const getHistories = async (req, res) => {
    try {
        const histories = await query();
        res.status(200).json({success: true, data: histories});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Histories from DB with name employee
const getHistory = async (req, res) => {
    const name = req.params.name;
    try {
        const histories = await query({who: name});
        res.status(200).json({success: true, data: histories});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add History to DB
const postHistory = async (req, res) => {
    try {
        const savedHistory = await save(req);
        res.status(201).json({success: true, data: savedHistory});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postHistory,
    getHistories,
    getHistory
}