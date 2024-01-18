const express = require('express');

function configExpress(app) {
    app.use(express.static('src/public'));
    
    return app;
}

module.exports = configExpress;