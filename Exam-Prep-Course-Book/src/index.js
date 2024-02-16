const express = require('express');
const mongoose = require('mongoose');



const app = express();
const port = 3000;

const routes = require('./routes');
const configExpress = require('./config/expressConfig')(app);
const configHandlebars = require('./config/handlebarsConfig')(app);

app.use(routes);

mongoose.connect('mongodb://localhost:27017/course-book')
    .then(() => {
        console.log('DB Connected!');
        app.listen(port, () => { console.log(`Server is listening on port ${port}`) });
    })
    .catch(err => console.log('Cannot connect to DB'));
