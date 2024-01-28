const router = require('express').Router();

const cubeServices = require('../services/cubeService');

router.get('/', async (req, res) => {
    const { title, dificultyFrom, dificultyTo } = req.query;
    const filteredCubes = await cubeServices.searchCube(title, dificultyFrom, dificultyTo).lean();
    res.render('home', { cubes: filteredCubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;