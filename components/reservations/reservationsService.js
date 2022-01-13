const Reservation = require("../../models/reservations");

const query = (filter = {}) => Reservation.find(filter);

// add Reservation to DB
const save = async (req) => {
    if (!/^\d+$/.test(req.body.phone_number)) {
        req.flash('error', 'Your phone must contains only digits!');
        return;
    }

    const {phone_number} = req.body;
    const {people} = req.body;
    const {when} = req.body;

    const newReservation = new Reservation({
        phone_number: phone_number,
        people: people,
        when: when
    });

    req.flash('success', 'You have successfully booked a table!');
    await newReservation.save();
};

module.exports = {
    query,
    save
}