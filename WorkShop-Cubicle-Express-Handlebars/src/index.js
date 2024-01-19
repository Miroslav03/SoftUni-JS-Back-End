const express = require('express');

const app = express();
const PORT = 5000;

const router = require('./router');
const configExpress = require('./config/expressConfig')(app);
const configHandlebars = require('./config/handlebars')(app);


app.use(router)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
