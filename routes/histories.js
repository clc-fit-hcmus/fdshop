const express = require('express');
const {postHistory, getHistories, getHistory} = require("../controllers/histories");

const router = express.Router();

router.get('/', getHistories);
router.get('/:name', getHistory);
router.post('/add', postHistory);

module.exports = router;
