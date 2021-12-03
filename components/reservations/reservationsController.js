const {query, save} = require("./reservationsService");

// get Reservations from DB
const getReservations = async (req, res) => {
    try {
        const reservations = await query();
        res.status(200).json({success: true, data: reservations});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

//get Reservations from DB with phone_number
const getReservation = async (req, res) => {
    const phone = req.params.phone;
    try {
        const reservations = await query({phone_number: phone});
        res.status(200).json({success: true, data: reservations});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add Reservation to DB
const postReservation = async (req, res) => {
    try {
        const savedReservation = await save(req);
        res.status(201).json({success: true, data: savedReservation});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postReservation,
    getReservations,
    getReservation
}