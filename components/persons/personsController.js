const {query, queryOne, save} = require("./personsService");

// get Persons from DB
const getPersons = async (req, res) => {
    try {
        const persons = await query();
        res.status(200).json({success: true, data: persons});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Person from DB with phone_number
const getPerson = async (req, res) => {
    const phone = req.params.phone;
    try {
        const person = await query({"info.phone_number": phone});
        res.status(200).json({success: true, data: person});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add Person to DB
const postPerson = async (req, res) => {
    try {
        const savedPerson = await save(req);
        res.status(201).json({success: true, data: savedPerson});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postPerson,
    getPersons,
    getPerson
}