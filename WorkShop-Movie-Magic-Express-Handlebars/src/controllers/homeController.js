const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/', async (req, res) => {
    const movies = await movieService.getAll().lean();
    console.log(movies);
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', (req, res) => {
    const { title, genre, year } = req.query;

    const filteredMovies = movieService.search(title, genre, year);

    res.render('search', { movies: filteredMovies });
});

module.exports = router;