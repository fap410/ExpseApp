
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

// POST endpoint to create an expense
app.post('/api/expenses', async (req, res) => {
    try {
        const { userid, amount, roomid, added_by } = req.body;

        // Validate input
        if (
            !userid ||
            amount === undefined ||
            amount === null ||
            !Number.isFinite(Number(amount)) ||
            Number(amount) <= 0 ||
            !roomid ||
            !added_by
        ) {
            return res.status(400).json({
                success: false,
                message: 'userid, positive amount, roomid and added_by are required'
            });
        }

        const sql = `
      INSERT INTO expenses
        (userid, amount, roomid, createdate, updatedate, added_by)
      VALUES (?, ?, ?, NOW(), NOW(), ?)
    `;

        const [result] = await pool.execute(sql, [
            userid,
            Number(amount),
            roomid,
            added_by
        ]);

        return res.status(201).json({
            success: true,
            message: 'Expense created successfully',
            expenseId: result.insertId
        });

    } catch (error) {
        console.error('Error creating expense:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to create expense'
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
