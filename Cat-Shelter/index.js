//Core node modules
const http = require('http');
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

//Paths to the json files where we store the data
const dataFolderPath = path.join(__dirname, 'data')
const breedJsonPath = path.join(dataFolderPath, 'breeds.json')
const catsJsonPath = path.join(dataFolderPath, 'cats.json')

//Html templates for diffrent views
const homeTemplate = require('./views/homeHtml');
const addCatTemplate = require('./views/addCatHtml');
const addBreedTemplate = require('./views/addBreedHtml')
const catShelterTemplate = require('./views/catShelterHtml')
const editCatTemplate = require('./views/editCatHtml')

//Css template for the views
const siteCss = require('./content/siteCss');





const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.write(homeTemplate);
    } else if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css'
        })
        res.write(siteCss)
    } else if (req.url === '/cats/add-cat') {


        if (req.method === 'GET') {
            let breedArr;
            fs.readFile('./data/breeds.json', 'utf8', (err, data) => {
                breedArr = JSON.parse(data);
                res.writeHead(200, {
                    'content-type': 'text/html'
                })
                res.write(addCatTemplate(breedArr));
            })
            
        } else if (req.method === 'POST') {
            let form = new formidable.IncomingForm()

            form.parse(req, (err, fields, files) => {
                if (err) {
                    throw err;
                }
                fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    const allCats = JSON.parse(data);
                    allCats.push({ id: allCats.length + 1, ...fields });
                    const jsonCats = JSON.stringify(allCats);

                    fs.writeFile('./data/cats.json', jsonCats, () => {
                        res.writeHead(302, { location: '/' });
                    })
                })

            })
        }

    } else if (req.url === '/cats/add-breed') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.write(addBreedTemplate)
    }


    res.end();
})

server.listen(5000);
console.log('Server is started at port 5000...');




