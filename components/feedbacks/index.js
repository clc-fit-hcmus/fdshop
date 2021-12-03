const express = require('express');
const {postFeedback, getFeedbacks, getFeedback} = require("./feedbacksController");

const router = express.Router();

router.get('/', getFeedbacks);
router.get('/:name', getFeedback);
router.post('/add', postFeedback);

module.exports = router;
