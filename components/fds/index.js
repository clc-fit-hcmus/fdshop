const express = require('express');
const {postFD, getFDs, getFD, getList, getDetail} = require("./fdsController");

const router = express.Router();

// rest api
router.get('/fds', getFDs);
router.get('/fds/:fdname', getFD);
router.post('/fds/add', postFD);

// menu page
router.get('/menu', getList);
router.get('/detail/:id', getDetail);

module.exports = router;