const router = require('express').Router();


const authSercive = require('../services/authService');


router.get('/register', (req, res) => {
    res.render('registerPage');
});


router.post('/register', async (req, res) => {
    const userData = req.body;
    authSercive.register(userData);
    res.redirect('/auth/login');
});


router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = await authSercive.login(username, password);

    res.cookie('auth', token);

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;