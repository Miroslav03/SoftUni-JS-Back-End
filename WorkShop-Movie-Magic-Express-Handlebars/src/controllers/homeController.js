const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/', async (req, res) => {
    const movies = await movieService.getAll().lean();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;

    const movieResult = await movieService.search(title, genre, year).lean()

    res.render('search', { movies: movieResult });
});

module.exports = router;