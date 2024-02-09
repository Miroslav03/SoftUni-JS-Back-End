const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';

    if (err instanceof mongoose.MongooseError) {    
        if (err.errors && Object.keys(err.errors).length > 0) {
            for (const prop of Object.values(err.errors)) {
                message += `${prop.message}`;
            }
        } else {
            message = err.message;
        }
    } else if (err instanceof Error) {
        message = err.message;
    }

    return message;
};