const router = require('express').Router();

const { isGuest } = require('../middlewares/authMiddleware');
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/register', isGuest, (req, res) => {
    res.render('./auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;
    try {
        await authService.regitser(userData);
        res.redirect('/auth/login');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('./auth/register', { error: message, ...userData });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('./auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('./auth/login', { error: message, email });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;