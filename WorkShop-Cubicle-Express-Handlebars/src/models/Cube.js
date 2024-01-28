const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    imageUrl: {
        required: true,
        type: String,
    },
    difficulty: {
        required: true,
        type: Number,
    }

})

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;