
const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');
const authenticateToken = require('../middleware/authMiddleware');

router.post(
    '/',
    authenticateToken,
    expenseController.createExpense
);

module.exports = router;
