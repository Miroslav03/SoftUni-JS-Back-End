const jwt = require('jsonwebtoken');
const utils = require('util');

function sign(payload, secretOrPrivateKey, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        })
    })
    return promise;
}

const verify = utils.promisify(jwt.verify);

module.exports = {
    sign,
    verify,
}