
const pool = require('../config/db');

async function createExpense(expense) {
    const { userid, amount, roomid, added_by } = expense;

    const sql = `
    INSERT INTO expenses
      (userid, amount, roomid, createdate, updatedate, added_by)
    VALUES (?, ?, ?, NOW(), NOW(), ?)
  `;

    const [result] = await pool.execute(sql, [
        userid,
        amount,
        roomid,
        added_by
    ]);

    return {
        expenseId: result.insertId,
        userid,
        amount,
        roomid,
        added_by
    };
}

module.exports = { createExpense };
