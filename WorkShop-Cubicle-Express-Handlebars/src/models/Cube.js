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
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;