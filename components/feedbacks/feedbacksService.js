const Feedback = require("../../models/feedbacks");

const query = (filter = {}) => Feedback.find(filter);

// add Feedback to DB
const save = async (req) => {
    const {who} = req.body;
    const {email} = req.body;
    const {feedback} = req.body;

    const newFeedback = new Feedback({
        who: who,
        email: email,
        feedback: feedback
    });

    return await newFeedback.save();
};

module.exports = {
    query,
    save
}