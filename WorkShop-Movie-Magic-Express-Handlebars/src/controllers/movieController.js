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
        res.redirect('/create');
    }

});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const starsCount = await movieService.getStars(movieId);
    movie.stars = starsCount;

    res.render('details', { movie, casts: movie.casts });
});

router.get('/movies/:movieId/attachCast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll().lean();

    res.render('./movie/castAttach', { movie, casts });
})

router.post('/movies/:movieId/attachCast', async (req, res) => {
    const castId = req.body.castId;
    const movieId = req.params.movieId;

    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/attachCast`);
})

router.get('/movies/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId).lean();

    res.render('./movie/edit', { movie });
});

module.exports = router;