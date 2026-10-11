
const expenseService = require('../services/expenseService');

async function createExpense(req, res) {
    try {
        const { userid, amount, roomid, added_by } = req.body;

        if (
            typeof userid !== 'string' || !userid.trim() ||
            typeof roomid !== 'string' || !roomid.trim() ||
            typeof added_by !== 'string' || !added_by.trim() ||
            amount === undefined ||
            amount === null ||
            (typeof amount !== 'number' && typeof amount !== 'string') ||
            (typeof amount === 'string' && !amount.trim()) ||
            !Number.isFinite(Number(amount)) ||
            Number(amount) <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: 'Valid useridds, positive amount, roomid and added_by are required'
            });
        }

        const expense = await expenseService.createExpense({
            userid: userid.trim(),
            amount: Number(amount),
            roomid: roomid.trim(),
            added_by: added_by.trim()
        });

        return res.status(201).json({
            success: true,
            message: 'Expense created successfully',
            data: expense
        });
    } catch (error) {
        console.error('Create expense failed:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to create expense'
        });
    }
}

module.exports = { createExpense };
