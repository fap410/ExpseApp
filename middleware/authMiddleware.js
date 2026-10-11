
const jwt = require('jsonwebtoken');

function authenticateClient(req, res, next) {
    const authorization = req.headers.authorization || '';

    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'invalid_token'
        });
    }

    try {
        const payload = jwt.verify(
            authorization.slice(7),
            process.env.JWT_SECRET,
            {
                algorithms: ['HS256'],
                issuer: 'expense-api',
                audience: 'expense-api'
            }
        );

        if (
            payload.scope !== 'expenses:write' ||
            payload.client_id !== process.env.CLIENT_ID
        ) {
            return res.status(403).json({
                error: 'insufficient_scope'
            });
        }

        req.client = {
            id: payload.client_id
        };

        next();
    } catch {
        return res.status(401).json({
            error: 'invalid_token'
        });
    }
}

module.exports = authenticateClient;
