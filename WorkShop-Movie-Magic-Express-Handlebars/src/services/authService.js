const User = require('../models/User');

exports.regitser = (userData) => User.create(userData);