const express = require('express');
const {postReservation, getReservations, getReservation} = require("./reservationsController");

const router = express.Router();

router.get('/reservation', function(req, res, next) {
    const successMessages = req.flash('success');
    const errorMessages = req.flash('error');
    res.render('reservation/reservation', { errorMessages: errorMessages, hasErrors: errorMessages.length > 0, successMessages: successMessages, hasSuccesses: successMessages.length > 0 });
  });
  
router.post('/reservation', postReservation);

module.exports = router;
