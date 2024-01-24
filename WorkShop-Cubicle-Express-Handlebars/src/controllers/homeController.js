const router = require('express').Router();

const cubeServices = require('../services/cubeService');

router.get('/', (req, res) => {
    const { title, dificultyFrom, dificultyTo } = req.query;
    const filteredCubes = cubeServices.searchCube(title, dificultyFrom, dificultyTo);
    res.render('home', { cubes: filteredCubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;