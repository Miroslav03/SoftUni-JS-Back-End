const router = require('express').Router();

const cubeService = require('../services/cubeService');


router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const cubeData = req.body;
    cubeService.addCube(cubeData);

    res.redirect('/');
});

router.get('/details/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cube = await cubeService.getOne(cubeId).lean();
    res.render('details', { cube, accessories: cube.accessories });

});


module.exports = router;