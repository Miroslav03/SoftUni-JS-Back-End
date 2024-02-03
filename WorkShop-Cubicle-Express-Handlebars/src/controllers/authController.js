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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = await authSercive.login(username, password);

    res.cookie('auth', token);

    res.redirect('/');
});
module.exports = router;