const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        res.redirect('/create')
    }

});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const starsCount = await movieService.getStars(movieId);
    movie.stars = starsCount;

    res.render('details', { movie });
});

router.get('/movies/:movieId/attachCast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll().lean();
    console.log(movie);
    console.log(casts);

    res.render('./movie/castAttach', { movie, casts })
})

router.post('/movies/:movieId/attachCast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll().lean();
    console.log(movie);
    console.log(casts);

    res.redirect('/')
})

module.exports = router;