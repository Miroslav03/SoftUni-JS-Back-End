const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;

    newMovie.owner = req.user._id;

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

    const isOwner = req.user._id == movie.owner;


    res.render('./movie/details', { movie, casts: movie.casts, isOwner });
});

router.get('/movies/:movieId/attachCast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll().lean();

    res.render('./movie/castAttach', { movie, casts });
})

router.post('/movies/:movieId/attachCast', isAuth, async (req, res) => {
    const castId = req.body.castId;
    const movieId = req.params.movieId;

    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/attachCast`);
})

router.get('/movies/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    res.render('./movie/edit', { movie });
});

module.exports = router;