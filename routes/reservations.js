const express = require('express');
const {postReservations} = require("../controllers/reservations");

const router = express.Router();

router.post('/add', postReservations);

module.exports = router;
