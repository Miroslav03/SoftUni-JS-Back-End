const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.regitser = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if(userData.password !== userData.rePassword){
        throw new Error('Password missmatch!');
    }

    if (user) {
        throw new Error('User with this email already exists!');
    }

    return User.create(userData);
}

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email or password doesn\'t match');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Email or password doesn\'t match');
    }

    const token = jwt.sign({ _id: user._id, email: user.email, }, SECRET, { expiresIn: '2h' });

    return token;
};