const mongoose = require('mongoose');
//CHANGE VALIDATION AND PROPERTY NAMES !
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must be filled!'],
        minLength: [5, 'Title Minimun length is 5 characters!'],
    },

    type: {
        type: String,
        required: [true, 'Type must be filled!'],
        minLength: [3, 'Type Minimun length is 3 characters!'],
    },
    certificate: {
        type: String,
        required: [true, 'Certificate must be filled!'],
        minLength: [2, 'Certificate must be at least 2 characres long!'],
    },

    description: {
        type: String,
        required: [true, 'Description must be filled!'],
        minLength: [10, 'Description must be at lest 10 charecetrs long!'],
        match: [/[a-zA-Z0-9 ]/, 'Invalid Description!'],
    },

    imageUrl: {
        type: String,
        required: [true, 'ImageUrl must be filled!'],
        match: [/^https?\:\/\//, 'Invalid ImageUrl!']
    },
    price: {
        type: Number,
        required: [true, 'Price must be filled!'],
        min: [0, 'Price must be a positive number!']
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;