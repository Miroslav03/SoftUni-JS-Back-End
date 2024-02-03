const router = require('express').Router();


router.get('/register', (req, res) => {
    res.render('registerPage');
});


router.post('/register', (req, res) => {
    res.redirect('loginPage');
});


router.get('/login', (req, res) => {
    res.render('loginPage');
});

module.exports = router;