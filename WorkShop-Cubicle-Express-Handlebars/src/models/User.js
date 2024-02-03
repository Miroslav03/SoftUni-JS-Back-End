const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
})

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new mongoose.Error('Password must be equal');
        }
    })

const User = mongoose.model('User', userSchema);

module.exports = User;