const router = require('express').Router();

const usersController = require('./controllers/userController');
const furnitureController = require('./controllers/furnitureController');

router.use('/users', usersController);
router.use('/furnitures', furnitureController);


module.exports = router;