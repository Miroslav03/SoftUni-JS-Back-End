const http = require('http')
const homeTemplate = require('./views/homeHtml')
const siteCss = require('./content/siteCss')
const addCatTemplate = require('./views/addCatHtml')

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.write(homeTemplate)

    } else if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css'
        })
        res.write(siteCss)
    } else if (req.url === '/cats/add-cat') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.write(addCatTemplate)
    }

    res.end()
})

server.listen(5000);
console.log('Server is started at port 5000...');



