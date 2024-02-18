const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name minimun length is 2 characters!'],
    },

    category: {
        type: String,
        required: true,
        minLength: [3, 'Category minimun length is 3 characters!'],
    },
    color: {
        type: String,
        required: true,
        minLength: [2, 'Color minimun length is 2 characters!'],
    },
    image: {
        type: String,
        required: true,
        match: [/^https?\:\/\//, 'Invalid ImageUrl!']
    },

    location: {
        type: String,
        required: true,
        min: [5, 'Location minimun location is 5!'],
        max: [15, 'Location maximum location is 15!'],
    },

    formula: {
        type: String,
        required: true,
        min: [3, 'Formula minimun formula is 3!'],
        max: [30, 'Formula maximum formula is 30!'],
    },

    description: {
        type: String,
        required: true,
        minLength: [10, 'Description minimun length is 10 characters!'],
    },

    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Stone = mongoose.model('Stone', stoneSchema);

module.exports = Stone;