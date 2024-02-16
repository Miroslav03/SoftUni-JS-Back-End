const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/courses', async (req, res) => {
    const books = await bookService.getAll().lean();
    res.render('catalog', { books });
});

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});


router.post('/create', async (req, res) => {
    const newCourse = req.body;

    try {
        await bookService.create(req.user._id, newCourse)
        res.redirect('/book/courses');
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('create', { error: message, ...newCourse });
    }
});

router.get('/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await bookService.getOneDetailed(courseId).lean();

    const signedUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isSigned = course.signUpList.some(user => req.user?._id == user._id);

    const isOwner = req.user?._id == course.owner._id;

    res.render('details', { ...course, isOwner, signedUpUsers, isSigned });
});

router.get('/:courseId/sign', async (req, res) => {
    const courseId = req.params.courseId;
    await bookService.sign(courseId, req.user._id);

    res.redirect(`/book/${courseId}`)
});



router.get('/:courseId/delete', isCourseOwner, async (req, res) => {
    const courseId = req.params.courseId;
    await bookService.delete(courseId);

    res.redirect('/book/courses');
});


router.get('/:courseId/edit', isCourseOwner, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await bookService.getOne(courseId).lean();
    res.render('edit', { course });
});

router.post('/:courseId/edit', isCourseOwner, async (req, res) => {
    const courseId = req.params.courseId;
    const courseData = req.body;

    try {
        await bookService.edit(courseId, courseData);
        res.redirect(`/book/${courseId}`);
    } catch (err) {
        const message = getErrorMessage(err);
        res.render('edit', { error: message, course: courseData });
    }

});

async function isCourseOwner(req, res, next) {
    const course = await bookService.getOne(req.params.courseId);

    if (course.owner != req.user?._id) {
        return res.redirect('/book/courses');
    }
    next();
};


module.exports = router