const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService');
const userService = require('../services/userService')

router.get('/', async (req, res) => {
    const books = await bookService.getLatestThree();
    res.render('home', { books });
});

router.get('/profile', isAuth, async (req, res) => {
    const profileData = req.user
    const userData = await userService.findOne(profileData._id);
    const signedLength = userData.signedCourses.length;
    const createdLength = userData.createdCourses.length;

    const userFullDetails = await userService.getFullDetails(profileData._id).lean();
    const createdCourses = userFullDetails.createdCourses;
    const signedCourses = userFullDetails.signedCourses;

    console.log(createdCourses);
    res.render('profile', { profileData, signedLength, createdLength, createdCourses, signedCourses });
});

module.exports = router