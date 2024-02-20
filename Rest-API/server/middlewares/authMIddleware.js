const jwt = require('../lib/jwt');
const SECRET = '123jk4k1234jnsoiljroia3pjio12345';

exports.auth = async (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;

        next();
    } catch (err) {

    }
}