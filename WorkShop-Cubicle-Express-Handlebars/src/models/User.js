const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },

    password: {
        type: String,
        required: true,
        match:[/[a-zA-Z0-9]/,'Password must be only English letters and digits!'],
        minLength:[5,'Password must be at least 5 symbols!']
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