const express = require('express');
const {postDelivery, getDeliveries, getDelivery} = require("../controllers/deliveries");

const router = express.Router();

router.get('/', getDeliveries);
router.get('/:phone', getDelivery);
router.post('/add', postDelivery);

module.exports = router;
