const router = require('express').Router();

const castService = require('../services/castService');


router.get('/create', (req, res) => {
    res.render('./cast/create');
})

router.post('/create', async (req, res) => {
    const castData = req.body;
    try {
        await castService.create(castData);
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        res.redirect('create');
    }
})

module.exports = router;