let mysql = require('mysql2');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'expenseapp',
    port: 3306,
    password: "NewStrongPassword_2026!"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});