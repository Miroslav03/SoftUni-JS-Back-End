const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

const router = require('./router');
const configExpress = require('./config/expressConfig')(app);
const configHandlebars = require('./config/handlebars')(app);


app.use(router);

mongoose.connect(`mongodb://localhost:27017/cubicle`)
    .then(() => {
        console.log('DB Connected!');
        app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}`); });
    })
    .catch(err => console.error('Cannot connect to DB!'));

