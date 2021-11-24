const Reservation = require("../models/reservations");

// add FD to DB
const postReservations = async (req, res) => {
    try {
        const {phone_number} = req.body;
        const {peoples} = req.body;
        const {when} = req.body;

        const newReservation = new Reservation({
            phone_number: phone_number,
            peoples: peoples,
            when: when
        });

        const savedReservation = await newReservation.save();
        res.status(201).json({success: true, data: savedReservation});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postReservations
}