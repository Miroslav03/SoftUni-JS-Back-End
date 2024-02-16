const router = require('express').Router();

//NAMES HERE MUST BE CHANGED CHECK BEFORE EXAM
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const bookController = require('./controllers/bookController');


router.use(homeController);
router.use('/auth',authController); 
router.use('/book',bookController)

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;