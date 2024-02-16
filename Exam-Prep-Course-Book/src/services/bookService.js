const Course = require('../models/Course');
const User = require('../models/User')

exports.create = async (userId, courseData) => {
    const createdCourse = await Course.create({
        owner: userId,
        ...courseData,
    });
    await User.findByIdAndUpdate(userId, { $push: { createdCourses: createdCourse._id } });
    return createdCourse;
};

exports.getAll = () => Course.find();

exports.getLatestThree = async () => {
    const courses = (await Course.find().lean()).reverse();
    const arr = [];

    for (let i = 0; i < 3; i++) {
        if (courses[i] === undefined) {
            break;
        }
        arr.push(courses[i]);
    }

    return arr;
}

exports.getOne = (courseId) => Course.findById(courseId);

exports.getOneDetailed = (courseId) => this.getOne(courseId).populate('owner').populate('signUpList');

exports.sign = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { signedCourses: courseId } });
}

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.edit = (courseId, newData) => Course.findByIdAndUpdate(courseId, newData, { runValidators: true });