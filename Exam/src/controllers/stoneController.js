const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/dashboard', async (req, res) => {
    const allStones = await stoneService.getAll().lean();

    res.render('dashboard', { allStones })
});

router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const newStone = req.body;

    try {
        await stoneService.create(req.user._id, newStone)
        res.redirect('/stone/dashboard');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('create', { error: message, ...newStone });
    }
});

router.get('/:stoneId/details', async (req, res) => {
    const stoneId = req.params.stoneId;
    const stone = await stoneService.getOneDetailed(stoneId).lean();

    const isSigned = stone.likedList.some(user => req.user?._id == user._id);
    const isOwner = req.user?._id == stone.owner._id;

    res.render('details', { stone, isOwner, isSigned, });
});

router.get('/:stoneId/like', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    await stoneService.like(stoneId, req.user._id);

    res.redirect(`/stone/${stoneId}/details`);
});

router.get('/:stoneId/edit', isStoneOwner, async (req, res) => {
    const stoneId = req.params.stoneId;
    const stone = await stoneService.getOneDetailed(stoneId).lean();

    res.render('edit', { stone });
});


router.post('/:stoneId/edit', isStoneOwner, async (req, res) => {
    const stoneId = req.params.stoneId;
    const stoneData = req.body;

    try {
        await stoneService.edit(stoneId, stoneData);
        res.redirect(`/stone/${stoneId}/details`);
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('edit', { error: message, stone: stoneData });
    }

});

router.get('/:stoneId/delete', isStoneOwner, async (req, res) => {
    const stoneId = req.params.stoneId;
    await stoneService.delete(stoneId);

    res.redirect('/stone/dashboard');
});


async function isStoneOwner(req, res, next) {
    const stone = await stoneService.getOne(req.params.stoneId);

    if (stone.owner != req.user?._id) {
        return res.redirect('/stone/dashboard');
    }
    next();
};

module.exports = router;