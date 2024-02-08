const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';

    if (err instanceof mongoose.MongooseError) {
        if (err.errors && Object.keys(err.errors) > 0) {
            message = Object.values(err.errors).at(0).message;
        } else {
            message = err.message;
        }
    } else if (err instanceof Error) {
        message = err.message;
    }

    return message;
};