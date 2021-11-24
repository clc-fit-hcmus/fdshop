const History = require("../models/histories");

// get Histories from DB
const getHistories = async (req, res) => {
    try {
        const histories = await History.find();
        res.status(200).json({success: true, data: histories});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Histories from DB with name employee
const getHistory = async (req, res) => {
    const name = req.params.name;
    try {
        const histories = await History.find({who: name});
        res.status(200).json({success: true, data: histories});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add History to DB
const postHistory = async (req, res) => {
    try {
        const {who} = req.body;
        const {when} = req.body;
        const {what} = req.body;

        const newHistory = new History({
            who: who,
            when: when,
            what: what
        });

        const savedHistory = await newHistory.save();
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