const router = require('express').Router();
const qs = require('querystring');

const furnitureService = require('../service/furnitureService');

router.get('/', async (req, res) => {
    const query = qs.parse(req.query.where)
    const ownerId = query._ownerId?.replace(/"/g,'');
    const furnitures = await furnitureService.getAll(ownerId);

    res.json(furnitures);
});

router.post('/', async (req, res) => {
    const furnitureData = req.body;
    const user = req.user._id;
 
    await furnitureService.create(furnitureData, user);

    res.json({ ok: true });
});

router.get('/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;

    const furniture = await furnitureService.getOne(furnitureId);

    res.json(furniture);
});

router.put('/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;
    const newData = req.body;

    await furnitureService.update(newData, furnitureId);

    res.json({ ok: true });
});

router.delete('/:furnitureId', async (req, res) => {
    const furnitureId = req.params.furnitureId;

    await furnitureService.delete(furnitureId);

    res.json({ ok: true });
});

module.exports = router;