const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

const serviceAuth = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.service = decoded;
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.redirect('/');
    }
};

module.exports = serviceAuth;
