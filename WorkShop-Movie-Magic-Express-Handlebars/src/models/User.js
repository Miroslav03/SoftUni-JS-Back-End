const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/g,
    },
    password: {
        type: String,
        required: true,
        minLength:6,
        match:/[a-zA-Z0-9]/g,
    },
})

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password){
            throw new mongoose.MongooseError('Passwords must be equal!')
        }
    })

const User = mongoose.model('User', userSchema);

module.exports = User;