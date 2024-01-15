const http = require('http');
const fs = require('fs');
const queryString = require('querystring')

const views = {
    home: './views/home/index.html',
    addBreed: './views/addBreed.html',
    addCat: './views/addCat.html',
    catShelter: './views/catShelter.html',
    editCat: './views/editCat.html',
    css: './content/styles/site.css'
}

const data = {
    cats: './data/cats.json',
    breeds: './data/breeds.json'
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(views.home, 'utf-8', (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            fs.readFile(data.cats, 'utf-8', (err, JSONArr) => {
                if (err) {
                    req.statusCode = 404;
                    return res.end();
                }

                const catsArr = JSON.parse(JSONArr);
                const catsHTML = catsArr.map(obj => `<li>
                <img src="${obj.img}" alt="">
                <h3>${obj.name}</h3>
                <p><span>Breed: </span>${obj.breed}</p>
                <p><span>Description: </span>${obj.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/shelter?catId=${obj.id}">New Home</a></li>
                </ul>
            </li>`)

                const placeHolder = `<li id="cats"></li>`

                const renderedTemplate = result.replace(placeHolder, catsHTML.join(''))
                res.writeHead(200, { 'content-type': 'text/html' });
                res.write(renderedTemplate);
                res.end();
            })
        })
    } else if (req.url === '/content/styles/site.css') {
        fs.readFile(views.css, 'utf-8', (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, { 'content-type': 'text/css' })
            res.write(result)
            res.end();
        })
    } else if (req.url === '/cats/add-cat') {
        if (req.method === 'GET') {
            fs.readFile(views.addCat, 'utf-8', (err, result) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end();
                }

                fs.readFile(data.breeds, 'utf-8', (err, JSONArr) => {
                    if (err) {
                        res.statusCode = 404;
                        return res.end()
                    }

                    const breedsArr = JSON.parse(JSONArr);
                    const optionTemplate = breedsArr.map(breed => `<option value="${breed}">${breed}</option>`)

                    const placeHolder = '<option id="placeHolder"></option>';

                    const renderedTemplate = result.replace(placeHolder, optionTemplate.join(''));
                    res.writeHead(200, { 'content-type': 'text/html' })
                    res.write(renderedTemplate);
                    res.end();
                })

            })
        } else if (req.method === 'POST') {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk;
            })

            req.on('close', () => {
                const parsedBody = queryString.parse(body);
                fs.readFile(data.cats, 'utf-8', (err, JSONArr) => {
                    const catsArr = JSON.parse(JSONArr);
                    parsedBody.id = catsArr.length + 1;
                    catsArr.push(parsedBody);
                    fs.writeFile(data.cats, JSON.stringify(catsArr), (err) => {
                        if (err) {
                            req.statusCode = 404;
                            return res.end();
                        }
                        res.writeHead(302, { 'location': '/' })
                        res.end();
                    })
                })
            })
        }
    } else if (req.url === '/cats/add-breed') {
        if (req.method === 'GET') {
            fs.readFile(views.addBreed, 'utf-8', (err, result) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end();
                }

                res.writeHead(200, { 'content-type': 'text/html' })
                res.write(result);
                res.end();
            })
        } else if (req.method === 'POST') {
            let body = ``;

            req.on('data', (chunk) => {
                body += chunk;
            })
            fs.readFile(data.breeds, 'utf-8', (err, JSONArr) => {
                const stringObj = queryString.parse(body);
                const breedArr = JSON.parse(JSONArr);
                breedArr.push(stringObj.breedName);

                fs.writeFile(data.breeds, JSON.stringify(breedArr), (err) => {
                    if (err) {
                        res.statusCode = 404;
                        return res.end();
                    }
                    res.writeHead(302, { 'location': '/' });
                    res.end();
                })


            })
        }
    } else if (req.url === '/cats/shelter?catId=1') {

        fs.readFile(views.catShelter, 'utf-8', (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            res.writeHead(200, { 'content-type': 'text/html' })
            res.write(result);
            res.end();
        })
    }
})


server.listen(5000);
console.log('Server is listening on port 5000...');