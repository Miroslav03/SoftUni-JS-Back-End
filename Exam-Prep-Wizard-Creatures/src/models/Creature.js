const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Minimun length is 2 characters!'],
    },

    species: {
        type: String,
        required: true,
        minLength: [3, 'Minimun length is 3 characters!'],
    },
    skin: {
        type: String,
        required: true,
        minLength: [3, 'Minimun length is 3 characters!'],
    },

    eye: {
        type: String,
        required: true,
        minLength: [3, 'Minimun length is 3 characters!'],
    },

    description: {
        type: String,
        required: true,
        minLength: [5, 'Minimun length is 5 characters!'],
        maxLength: [500, 'Minimun length is 500 characters!'],
    },

    imageUrl: {
        type: String,
        required: true,
        match: [/^https?\:\/\//, 'Invalid ImageUrl!']
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;