const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
})

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;