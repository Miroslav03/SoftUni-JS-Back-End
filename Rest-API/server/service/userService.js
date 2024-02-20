const User = require('../models/User');
const jwt = require('../lib/jwt');
const SECRET = '123jk4k1234jnsoiljroia3pjio12345';
const bcrypt = require('bcrypt');

exports.register = async (userData) => {
    const user = await User.create(userData);

    const token = getUserToken(userData);

    return {
        accessToken: token,
        email: user.email,
        id: user._id
    };
};


exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error('Email or password doesn\'t match');
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new Error('Email or password doesn\'t match');
    }

    const token = getUserToken(userData);

    return {
        accessToken: token,
        email: user.email,
        id: user._id
    };

};

async function getUserToken(userData) {
    const token = await jwt.sign({ email: userData.email, _id: userData._id }, SECRET);
    return token;
}

