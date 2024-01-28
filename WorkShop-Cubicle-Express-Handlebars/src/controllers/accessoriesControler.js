const router = require('express').Router();

const accessoriesServices = require('../services/accessoriesService');


router.get('/create', (req, res) => {
    res.render('./accessories/createAccessory');
});

router.post('/create', (req, res) => {
    const data = req.body;
    accessoriesServices.create(data);
    res.redirect('/accessory/create');
});


module.exports = router;
