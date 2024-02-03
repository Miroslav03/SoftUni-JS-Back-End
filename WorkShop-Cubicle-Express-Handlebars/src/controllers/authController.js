const router = require('express').Router();


const authSercive = require('../services/authService');


router.get('/register', (req, res) => {
    res.render('registerPage');
});


router.post('/register', async (req, res) => {
    const { username, password, rePassword } = req.body;
    await authSercive.register(username, password, rePassword);

    res.redirect('/auth/login');
});


router.get('/login', (req, res) => {
    res.render('loginPage');
});

module.exports = router;