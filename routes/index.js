const express = require('express');
const router = express.Router();
const { getBestList } = require('../components/fds/fdsController')

/* GET home page. */
router.get('/', getBestList);

module.exports = router;
