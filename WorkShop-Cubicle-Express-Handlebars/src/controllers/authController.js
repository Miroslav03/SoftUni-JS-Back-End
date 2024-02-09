const router = require('express').Router();


const authSercive = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/register', (req, res) => {
    res.render('registerPage');
});


router.post('/register', async (req, res) => {
    const userData = req.body;
    try {
        await authSercive.register(userData);
        res.redirect('/auth/login');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('registerPage', { error: message, ...userData });
    }
});


router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authSercive.login(username, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('loginPage', { error: message, username, password });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;