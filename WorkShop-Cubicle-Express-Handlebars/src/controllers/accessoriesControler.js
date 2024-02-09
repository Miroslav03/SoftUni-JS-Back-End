const router = require('express').Router();

const accessoriesServices = require('../services/accessoriesService');
const cubeService = require('../services/cubeService');
const { getErrorMessageCubeOrAccessory } = require('../utils/errorUtils');

router.get('/create', (req, res) => {
    res.render('./accessories/createAccessory');
});

router.post('/create', async (req, res) => {
    const data = req.body;
    try {
        await accessoriesServices.create(data);
        res.redirect('/accessory/create');
    } catch (err) {
        const message = getErrorMessageCubeOrAccessory(err);
        res.render('./accessories/createAccessory', { error: message, ...data });
    }
});

router.get('/attach/:cubeId', async (req, res) => {
    const id = req.params.cubeId;
    const cube = await cubeService.getOne(id).lean();
    const accessories = await accessoriesServices.getAll().lean();
    res.render('./accessories/attachAccessory', { cube, accessories });
});

router.post('/attach/:cubeId', async (req, res) => {
    const accId = req.body.accId;
    const cubeId = req.params.cubeId;
    cubeService.attach(cubeId, accId);
    res.redirect(`/accessory/attach/${cubeId}`);
});




module.exports = router;
