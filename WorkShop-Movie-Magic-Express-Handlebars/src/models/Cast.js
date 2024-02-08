const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        match: [/[a-zA-Z0-9 ]/,'Invalid Name!'],
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120,
    },
    born: {
        type: String,
        required: true,
        minLength: 10,
        match: [/[a-zA-Z0-9 ]/,'Invalid Born Place!'],
    },
    nameInMovie: {
        type: String,
        required: true,
        minLength: 5,
        match: [/[a-zA-Z0-9 ]/,'Invalid Role Name!'],
    },
    castImg: {
        type: String,
        match: [/^https?:\/\//,'Invalid CastImg!'],
    }
})

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;