const router = require('express').Router();

const cubeService = require('../services/cubeService');


router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cubeData = req.body;
    cubeService.addCube(cubeData)
    
    res.redirect('/');
});


module.exports = router;