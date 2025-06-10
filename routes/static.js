const express = require('express');
const router = express.Router();
const serviceAuth = require('../middleware/serviceAuth');
const checkNotAuthenticated = require('../middleware/checkNotAuthenticated');

router.get('/sign-up', checkNotAuthenticated, (req, res) => {
    res.render('signup');
});

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login', { message: null });
});

router.get('/dashboard', serviceAuth, (req, res) => {
    res.render('dashboard', { service: req.service });
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.redirect('/');
});


module.exports = router;
