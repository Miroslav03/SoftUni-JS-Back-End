const router = require('express').Router();


const creatureService = require('../services/creatureService');

router.get('/', async (req, res) => {
    res.render('home',);
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;

    const movieResult = await movieService.search(title, genre, year).lean();

    res.render('search', { movies: movieResult });
});

router.get('/profile', async (req, res) => {
    const userId = req.user._id;
    const userInfo = await creatureService.getOneDetailedUser(userId).lean();

    const addedCreatures = userInfo.addedCreature;

    res.render('profile', { addedCreatures });
});


module.exports = router;