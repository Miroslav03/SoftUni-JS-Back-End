const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');


exports.register = async (username, password, rePassword) => {
    if (password !== rePassword) {
        throw new Error('Passwords must match!');
    }

    const user = await User.findOne({ username });

    if(user){
        return;
    }

    const hashedPass = await bcrypt.hash(password, 10);
    return User.create({ username, password: hashedPass });
};



exports.login = async (username, password) => {

    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid Username or Password!');
    }

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
        throw new Error('Invalid Username or Password!');
    }

    const token = await jwt.sign({ _id: user._id, username: user.username }, SECRET, { expiresIn: '2h' });

    return token;
};