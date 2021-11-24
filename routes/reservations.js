const express = require('express');
const {postReservation, getReservations, getReservation} = require("../controllers/reservations");

const router = express.Router();

router.get('/', getReservations);
router.get('/:phone', getReservation);
router.post('/add', postReservation);

module.exports = router;
