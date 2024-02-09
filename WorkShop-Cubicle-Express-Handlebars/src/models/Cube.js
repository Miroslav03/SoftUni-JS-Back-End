const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        match:[/[a-zA-Z0-9 ]/,'Name can be letters, digits or whitespaces!'],
        minLength:[5,'Name must be at least 5 symbols!']
    },
    description: {
        required: true,
        type: String,
        match:[/[a-zA-Z0-9 ]/,'Description can be letters, digits or whitespaces!'],
        minLength:[20,'Description must be at least 20 symbols!']
    },
    imageUrl: {
        required: true,
        type: String,
        match:[/^https?\:\/\//,'ImageUrl must start with https:// or http://!']
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