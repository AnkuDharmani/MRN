const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

const checkNotAuthenticated = (req, res, next) => {
    const token = req.cookies?.auth_token;

    if (!token) return next();

    try {
        jwt.verify(token, SECRET);
        return res.redirect('/dashboard');
    } catch {
        return next(); 
    }
};

module.exports = checkNotAuthenticated;
