const User = require('../models/User');


exports.findOne = (id) => User.findById(id);


exports.getFullDetails = (id) => this.findOne(id).populate('createdCourses').populate('signedCourses');
