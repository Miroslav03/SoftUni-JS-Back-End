const router = require('express').Router();

const userService = require('../service/userService');

router.post('/register', async (req, res) => {
    const userData = req.body;

    const user = await userService.register(userData);

    res.json(user);
});

router.post('/login', async (req, res) => {
    const userData = req.body;

    const user = await userService.login(userData);

    res.json(user);

});

router.get('/logout', (req, res) => {
    res.json();
});

module.exports = router;
