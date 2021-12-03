const History = require("../../models/histories");

const query = (filter = {}) => History.find(filter);

// add History to DB
const save = async (req) => {
    const {who} = req.body;
    const {when} = req.body;
    const {what} = req.body;

    const newHistory = new History({
        who: who,
        when: when,
        what: what
    });

    return await newHistory.save();
};

module.exports = {
    query,
    save
}