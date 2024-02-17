const mongoose = require('mongoose');
//THIS IS LOGIN AND REGISTER SINGLE LINE ERROR MESSAGES
exports.getErrorMessage = (err) => {
    if (err instanceof mongoose.MongooseError) {
        return Object.values(err.errors).at(0).message;
    } else if (err instanceof Error) {
        return err.message;
    }
};
//THIS FUNC IS FOR MULTI LINE ERRORS TO GET HE FULL MESSAGE CHANGE FUNC NAME AND CHECK OBJECT PARSE DATA
exports.getMovieAndCastErrorMessages = (err) => {
    let message = '';

    for (const iterator of Object.values(err.errors)) {
        message += `\n${iterator.path} - ${iterator.message}`
    }
    return message;
};

