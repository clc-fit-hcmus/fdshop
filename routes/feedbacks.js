const express = require('express');
const {postFeedback, getFeedbacks, getFeedback} = require("../controllers/feedbacks");

const router = express.Router();

router.get('/', getFeedbacks);
router.get('/:name', getFeedback);
router.post('/add', postFeedback);

module.exports = router;
