const router = require('express').Router();

//IF YOU NEED CHANGE NAMES HERE BUT ITS NOT THAT NECESSARY!
const creatureService = require('../services/creatureService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/all', async (req, res) => {
    const allCreatures = await creatureService.getAll().lean();

    res.render('all', { allCreatures })
});


router.get('/create', (req, res) => {
    res.render('create')
});

router.post('/create', async (req, res) => {
    const newCreature = req.body;
    try {
        await creatureService.create(req.user._id, newCreature)
        res.redirect('/post/all');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('create', { error: message });
    }
});

router.get('/:creatureId/details', async (req, res) => {
    const creatutrId = req.params.creatureId;
    const creature = await creatureService.getOneDetailed(creatutrId).lean();

    const owner = creature.owner.firstname + ' ' + creature.owner.lastname;
    const votesCount = creature.votes.length;
    const votesString = creature.votes.map(voter => voter.email).join(', ');

    const isSigned = creature.votes.some(user => req.user?._id == user._id);
    const isOwner = req.user?._id == creature.owner._id;

    res.render('details', { creature, votesCount, votesString, isOwner, isSigned, owner })
});

router.get('/:creatureId/vote', async (req, res) => {
    const creatureId = req.params.creatureId;
    await creatureService.sign(creatureId, req.user._id);

    res.redirect(`/post/${creatureId}/details`)
});

router.get('/:creatureId/edit', async (req, res) => {
    const creatutrId = req.params.creatureId;
    const creature = await creatureService.getOneDetailed(creatutrId).lean();

    res.render('edit', { creature });
});

router.post('/:creatureId/edit', async (req, res) => {
    const creatureId = req.params.creatureId;
    const creatureData = req.body;

    try {
        await creatureService.edit(creatureId, creatureData);
        res.redirect(`/post/${creatureId}/details`)
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('edit', { error: message });
    }
});


router.get('/:creatureId/delete', async (req, res) => {
    const creatureId = req.params.creatureId;
    await creatureService.delete(creatureId);

    res.redirect('/post/all');
});






module.exports = router;