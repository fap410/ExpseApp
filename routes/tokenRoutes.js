
const express = require('express');
const router = express.Router();

const { issueToken } = require('../controllers/tokenController');

router.post('/token', issueToken);

module.exports = router;
