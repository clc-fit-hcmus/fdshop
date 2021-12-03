const {query, save} = require("./feedbacksService");

// get Feedbacks from DB
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await query();
        res.status(200).json({success: true, data: feedbacks});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Feedbacks from DB with name employee
const getFeedback = async (req, res) => {
    const name = req.params.name;
    try {
        const feedbacks = await query({who: name});
        res.status(200).json({success: true, data: feedbacks});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add Feedback to DB
const postFeedback = async (req, res) => {
    try {
        const savedFeedback = await save(req);
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