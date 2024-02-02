const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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
        if (value !== this.password){
            throw new mongoose.MongooseError('Passwords must be equal!')
        }
    })

const User = mongoose.model('User', userSchema);

module.exports = User;