const jwt = require('jsonwebtoken');
const utils = require('util');

const sign = utils.promisify(jwt.sign);
const verify = utils.promisify(jwt.verify);

module.exports = {
    sign,
    verify,
}