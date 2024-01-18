const express = require('express');

const app = express();
const port = 5000;

const routes = require('./routes');
const configExpress = require('./config/expressConfig')(app);
const configHandlebars = require('./config/handlebarsConfig')(app);

app.use(routes);

app.listen(port, () => { console.log(`Server is listening on port ${port}`) });