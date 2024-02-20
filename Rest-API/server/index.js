const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const { auth } = require('./middlewares/authMIddleware');

const app = express();

app.use(cors());//Cross-Origin Requests
app.use(express.json());//Json parser 
app.use(auth)

app.use(routes);

mongoose.connect('mongodb://localhost:27017/furniture')
    .then(() => {
        console.log('DB is connected!');
        app.listen(3030, () => { console.log('Server is listening on port 3030...') });
    })
    .catch((err) => console.log('Cannot connect to DB!'));