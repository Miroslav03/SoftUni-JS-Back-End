const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5,'Minimun length is 5 characters!'],
        match: [/[a-zA-Z0-9 ]/,'Invalid Title!'],
    },

    genre: {
        type: String,
        required: true,
        minLength: [5,'Minimun length is 5 characters!'],
        match: [/[a-zA-Z0-9 ]/,'Invalid Genre!'],
    },
    director: {
        type: String,
        required: true,
        minLength: [5,'Minimun length is 5 characters!'],
        match: [/[a-zA-Z0-9 ]/,'Invalid Director!'],
    },

    year: {
        type: Number,
        required: true,
        min: [1900,'Minimun year is 1900!'],
        max: [2024,'Maximum year is 2024!'],
    },

    rating: {
        type: Number,
        required: true,
        min: [1,'Minimun rating is 1!'],
        max: [5,'Maximum rating is 5!'],
    },

    description: {
        type: String,
        required: true,
        minLength: [20,'Minimun length is 20 characters!'],
        match: [/[a-zA-Z0-9 ]/,'Invalid Description!'],
    },

    imageUrl: {
        type: String,
        required: true,
        match: [/^https?\:\/\//,'Invalid ImageUrl!']
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;