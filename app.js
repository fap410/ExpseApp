const express = require('express');
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
const app = express();

const tokenRoutes = require('./routes/tokenRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const authenticateClient = require('./middleware/authMiddleware');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json({ limit: '10kb' }));

app.use('/oauth', tokenRoutes);

// Log every incoming request



app.use(
    '/api/expenses',
    authenticateClient,
    expenseRoutes
);

app.listen(process.env.PORT || 3000, () => {
    console.log('Expense API is running');
});