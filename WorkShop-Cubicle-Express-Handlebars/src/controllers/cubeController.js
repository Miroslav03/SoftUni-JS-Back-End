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

router.get('/edit/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cubeData = await cubeService.getOne(cubeId).lean();
    const difficultyArr = cubeService.difficultyLevelOptions(cubeData.difficulty)

    res.render('editCube', { cubeData, difficultyArr });
});

router.post('/edit/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cubeData = req.body;
    await cubeService.edit(cubeId, cubeData);
    res.redirect(`/details/${cubeId}`);
});

router.get('/delete/:id', async (req, res) => {
    const cubeId = req.params.id;
    const cubeData = await cubeService.getOne(cubeId).lean();
    const difficultyArr = cubeService.difficultyLevelOptions(cubeData.difficulty)
    res.render('deleteCube', { cubeData, difficultyArr });
});

router.post('/delete/:id', async (req, res) => {
    const cubeId = req.params.id;
    await cubeService.delete(cubeId);
    res.redirect(`/`);
});

module.exports = router;