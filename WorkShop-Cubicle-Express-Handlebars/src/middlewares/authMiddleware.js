const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');


exports.auth = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);

        const user = decodedToken;
        res.locals.isAuthorized = true;
        next();
    } catch (err) {
        res.clearCookie();
        res.redirect('/auth/login');
    }
};