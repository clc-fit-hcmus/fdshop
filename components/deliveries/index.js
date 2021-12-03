const express = require('express');
const {postDelivery, getDeliveries, getDelivery} = require("./deliveriesController");

const router = express.Router();

router.get('/', getDeliveries);
router.get('/:phone', getDelivery);
router.post('/add', postDelivery);

module.exports = router;
