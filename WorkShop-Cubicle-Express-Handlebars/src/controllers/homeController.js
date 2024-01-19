const router = require('express').Router();

const cubeServices = require('../services/cubeService')

router.get('/', (req, res) => {
    const cubes = cubeServices.getAll();
    res.render('home', { cubes });
});

router.get('/about', (req, res) => {
    res.render('about')
});

module.exports = router;