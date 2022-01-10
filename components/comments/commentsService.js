const Comment = require("../../models/comments");

const query = (filter = {}) => Comment.find(filter);
const queryFor = (skip, limit) => Comment.find().skip(skip).limit(limit).lean();
const querySortFor = (skip, limit, sort = {}) => Comment.find().sort(sort).skip(skip).limit(limit).lean();
const count = (filter = {}) => Comment.countDocuments(filter);

// add Comment to DB
const save = async (req) => {
    const {name} = req.body;
    const {content} = req.body;

    const newComment = new Comment({
        name: name,
        content: content
    });

    return await newComment.save();
};

module.exports = {
    queryFor,
    query,
    save,
    count,
    querySortFor
}