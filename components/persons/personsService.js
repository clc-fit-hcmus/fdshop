const Person = require("../../models/persons");

const query = (filter = {}) => Person.find(filter);

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

module.exports = {
    query,
    save
}