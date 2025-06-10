const jwt = require('jsonwebtoken');

const SECRET = process.env.SERVICE_SECRET || 'supersecretkey';

function generateToken(serviceName) {
    return jwt.sign({ service: serviceName }, SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
