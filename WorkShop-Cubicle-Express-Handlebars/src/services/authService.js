const User = require('../models/User');
const bcrypt = require('bcrypt');



exports.register = async (username, password, rePassword) => {
    if (password !== rePassword) {
        throw new Error('Passwords must match!');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    return User.create({ username, password: hashedPass });
};