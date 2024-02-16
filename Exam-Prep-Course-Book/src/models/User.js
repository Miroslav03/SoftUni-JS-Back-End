const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be filled!'],
        minLength: [2, 'Username must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email must be filled!'],
        unique: true,
        minLength: [10, 'Email must be at leat 10 characters long!']
    },
    password: {
        type: String,
        required: [true, 'Password must be filled!'],
        minLength: [4, 'Password must be at least 4 characters long!']
    },
    createdCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }],
    signedCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course',
    }]

})

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;