const Feedback = require("../models/feedbacks");

// get Feedbacks from DB
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json({success: true, data: feedbacks});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Feedbacks from DB with name employee
const getFeedback = async (req, res) => {
    const name = req.params.name;
    try {
        const feedbacks = await Feedback.find({who: name});
        res.status(200).json({success: true, data: feedbacks});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add Feedback to DB
const postFeedback = async (req, res) => {
    try {
        const {who} = req.body;
        const {email} = req.body;
        const {feedback} = req.body;

        const newFeedback = new Feedback({
            who: who,
            email: email,
            feedback: feedback
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json({success: true, data: savedFeedback});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postFeedback,
    getFeedbacks,
    getFeedback
}