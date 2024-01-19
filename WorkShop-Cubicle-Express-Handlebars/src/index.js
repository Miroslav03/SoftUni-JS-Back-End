const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 5000;


app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.set('views', path.resolve('src/views'));


app.use(express.static('src/public'))

app.get('/', (req, res) => {
    res.render('home', { layout: false })
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
