const Reservation = require("../../models/reservations");

const query = (filter = {}) => Reservation.find(filter);

// add Reservation to DB
const save = async (req) => {
    const {phone_number} = req.body;
    const {peoples} = req.body;
    const {when} = req.body;

    const newReservation = new Reservation({
        phone_number: phone_number,
        peoples: peoples,
        when: when
    });

    return await newReservation.save();
};

module.exports = {
    query,
    save
}