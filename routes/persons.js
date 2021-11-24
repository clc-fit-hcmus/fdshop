const express = require('express');
const {postPerson, getPersons, getPerson} = require("../controllers/persons");

const router = express.Router();

router.get('/', getPersons);
router.get('/:phone', getPerson);
router.post('/add', postPerson);

module.exports = router;
