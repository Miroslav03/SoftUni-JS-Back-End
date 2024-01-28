const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
        max: 100.
    },
    imageUrl: {
        required: true,
        type: String,
        match: /^http?s\:\/\//,
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
