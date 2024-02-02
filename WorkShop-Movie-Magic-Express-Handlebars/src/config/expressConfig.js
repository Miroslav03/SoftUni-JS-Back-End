const express = require('express');
const cookieParser = require('cookie-parser');

function configExpress(app) {
    app.use(express.static('src/public'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser())

    return app;
}

module.exports = configExpress;