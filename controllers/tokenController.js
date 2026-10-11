
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function issueToken(req, res) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const { grant_type, client_id, client_secret } = req.body;

    if (grant_type !== 'client_credentials') {
        return res.status(400).json({
            error: 'unsupported_grant_type'
        });
    }

    if (
        typeof client_id !== 'string' ||
        typeof client_secret !== 'string'
    ) {
        return res.status(401).json({
            error: 'invalid_client'
        });
    }

    const expectedId = process.env.CLIENT_ID;
    const expectedSecret = process.env.CLIENT_SECRET;

    if (!expectedId || !expectedSecret || !process.env.JWT_SECRET) {
        return res.status(500).json({
            error: 'server_configuration_error'
        });
    }

    const idMatches =
        client_id.length === expectedId.length &&
        crypto.timingSafeEqual(
            Buffer.from(client_id),
            Buffer.from(expectedId)
        );

    const secretMatches =
        client_secret.length === expectedSecret.length &&
        crypto.timingSafeEqual(
            Buffer.from(client_secret),
            Buffer.from(expectedSecret)
        );

    if (!idMatches || !secretMatches) {
        return res.status(401).json({
            error: 'invalid_client'
        });
    }

    const accessToken = jwt.sign(
        {
            scope: 'expenses:write',
            client_id: expectedId
        },
        process.env.JWT_SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '15m',
            issuer: 'expense-api',
            audience: 'expense-api'
        }
    );

    return res.json({
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: 900
    });
}

module.exports = { issueToken };
