const router = require('express').Router();

const stoneService = require('../services/stoneService');

router.get('/', async (req, res) => {
    const stones = await stoneService.getLatestThree();
    res.render('home', { stones });
});


router.get('/search', async (req, res) => {
    const { name } = req.query;

    const searchResult = await stoneService.search(name).lean();

    res.render('search', { searchResult });
});

module.exports = router;