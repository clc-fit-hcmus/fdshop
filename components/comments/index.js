const express = require('express');
const {getComments, postComment} = require("./commentsController");
const {isLoggedIn, notLoggedIn, both} = require('../../utils/login');

const router = express.Router();

router.get('/comment', getComments);
router.post('/comment', postComment);

module.exports = router;
