const express = require('express');
const {postFD, getFDs, getFD} = require("../controllers/fds");

const router = express.Router();

router.get('/', getFDs);
router.get('/:fdname', getFD);
router.post('/add', postFD);

module.exports = router;
