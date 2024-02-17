const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 3,
    },
    lastname: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    addedCreature: [{
        type: mongoose.Types.ObjectId,
        ref: 'Creature',
    }],
    votedCreatures:[{
        type: mongoose.Types.ObjectId,
        ref: 'Creature',
    }]
})

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;