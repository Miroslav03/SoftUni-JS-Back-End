const router = require('express').Router();

const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoriesController = require('./controllers/accessoriesControler');
const authController = require('./controllers/authController');


router.use(homeController);
router.use(cubeController);
router.use('/accessory',accessoriesController);
router.use('/auth',authController)

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;