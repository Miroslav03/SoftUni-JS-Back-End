const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [5,'Minimun length is 5 characters!'],
        match: [/[a-zA-Z0-9 ]/,'Invalid Name!'],
    },
    age: {
        type: Number,
        required: true,
        min: [1,'Minimun length is 1 characters!'],
        max: [120,'Maximum length is 120 characters!'],
    },
    born: {
        type: String,
        required: true,
        minLength: [10,'Minimun length is 10 characters!'],
        match: [/[a-zA-Z0-9 ]/,'Invalid Born Place!'],
    },
    nameInMovie: {
        type: String,
        required: true,
        minLength: [5,'Minimun length is 5 characters!'],
        match: [/[a-zA-Z0-9 ]/,'Invalid Role Name!'],
    },
    castImg: {
        type: String,
        match: [/^https?:\/\//,'Invalid CastImg!'],
    }
})

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;