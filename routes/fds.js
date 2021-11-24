const express = require('express');
const {postFDs} = require("../controllers/fds");

const router = express.Router();

router.post('/add', postFDs);

module.exports = router;
