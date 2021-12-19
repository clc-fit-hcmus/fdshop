const Person = require("../../models/persons");

const query = (filter = {}) => Person.find(filter).lean();

const queryOne = (filter = {}) => Person.findOne(filter).lean();

// add Person to DB
const save = async (req) => {
    const {login} = req.body;
    const {info} = req.body;

    const newPerson = new Person({
        login: login,
        info: info
    });

    return await newPerson.save();
};

// update Person's information from DB
const update = async (req) => {
    const {login} = req.body;
    const {info} = req.body;

    const updatePerson = new Person({
        login: login,
        info: info
    });

    return await Person.findOneAndUpdate({"login.username": req.params.username}, {updatePerson}, {upsert: true, new: true})
};

module.exports = {
    query,
    queryOne,
    save,
    update
}