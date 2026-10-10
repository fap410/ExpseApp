const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Hello from AWS EC2 Node.js!"
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        status: "success",
        message: "Node.js API is working"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});