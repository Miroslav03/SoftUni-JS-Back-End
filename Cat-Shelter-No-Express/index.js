const http = require('http');
const fs = require('fs');
const queryString = require('querystring');
const url = require('url');
const views = {
    home: './views/home/index.html',
    addBreed: './views/addBreed.html',
    addCat: './views/addCat.html',
    catShelter: './views/catShelter.html',
    editCat: './views/editCat.html',
    css: './content/styles/site.css',
    shelter:'./views/catShelter.html'
}

const data = {
    cats: './data/cats.json',
    breeds: './data/breeds.json'
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathName = parsedUrl.pathname;

    if (req.url === '/') {
        if (req.method === 'GET') {
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
                        <li class="btn edit"><a href="/cats/edit?catName=${obj.name}">Change Info</a></li>
                        <li class="btn delete"><a href="/cats/shelter?catName=${obj.name}">New Home</a></li>
                    </ul>
                </li>`)

                    const placeHolder = `<li id="cats"></li>`

                    const renderedTemplate = result.replace(placeHolder, catsHTML.join(''))
                    res.writeHead(200, { 'content-type': 'text/html' });
                    res.write(renderedTemplate);
                    res.end();
                })
            })
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            })

            req.on('close', () => {
                const parsedName = queryString.parse(body);
                fs.readFile(data.cats, 'utf-8', (err, jsonArr) => {
                    let catsArr = JSON.parse(jsonArr);
                    catsArr = catsArr.filter(cat => (cat.name.toLowerCase()).includes(parsedName.toLowerCase()))

                    fs.readFile(views.shelter, 'utf-8', (err, result) => {
                        if (err) {
                            res.statusCode = 404;
                            return res.end();
                        }

                        const catsHTML = catsArr.map(obj => `<li>
                        <img src="${obj.img}" alt="">
                        <h3>${obj.name}</h3>
                        <p><span>Breed: </span>${obj.breed}</p>
                        <p><span>Description: </span>${obj.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="/cats/edit?catName=${obj.name}">Change Info</a></li>
                            <li class="btn delete"><a href="/cats/shelter?catName=${obj.name}">New Home</a></li>
                        </ul>
                    </li>`)
    
                        const placeHolder = `<h1 id="placeHolder"></h1>`
    
                        const renderedTemplate = result.replace(placeHolder, catsHTML.join(''))
                        res.writeHead(200, { 'content-type': 'text/html' });
                        res.write(renderedTemplate);
                        res.end();

                    })
                })
            })
        }

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
    } else if (pathName === '/cats/shelter') {
        const catName = parsedUrl.query.catName;
        if (req.method === 'GET') {
            fs.readFile(views.catShelter, 'utf-8', (err, result) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end();
                }

                fs.readFile(data.cats, 'utf-8', (err, JSONArr) => {
                    if (err) {
                        res.statusCode = 404;
                        return res.end();
                    }
                    const catArr = JSON.parse(JSONArr);
                    const foundCat = catArr.find(obj => obj.name === catName);

                    const template = `<form action="/cats/shelter?catName=${foundCat.name}" method="POST" class="cat-form">
                    <h2>Shelter the cat</h2>
                    <img src="${foundCat.img}" alt="">
                    <label for="name">Name</label>
                    <input type="text" id="name" value="${foundCat.name}" disabled>
                    <label for="description">Description</label>
                    <textarea id="description" disabled>${foundCat.description}</textarea>
                    <label for="group">Breed</label>
                    <select id="group" disabled>
                        <option value="Fluffy Cat">${foundCat.breed}</option>
                    </select>
                    <button>SHELTER THE CAT</button>
                    </form>`;

                    const placeHolder = `<h1 id="placeHolder"></h1>`
                    console.log(catName);
                    const renderedTemplate = result.replace(placeHolder, template);
                    res.writeHead(200, { 'content-type': 'text/html' })
                    res.write(renderedTemplate);
                    res.end();
                })
            })
        } else if (req.method === 'POST') {
            fs.readFile(data.cats, 'utf-8', (err, JSONArr) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end();
                }

                let catsArr = JSON.parse(JSONArr);
                catsArr = catsArr.filter(obj => obj.name !== catName);

                fs.writeFile(data.cats, JSON.stringify(catsArr), (err) => {
                    if (err) {
                        res.statusCode = 404;
                        return res.end();
                    }

                    res.writeHead(302, { 'location': '/' });
                    res.end();
                })
            })
        }

    } else if (pathName === '/cats/edit') {
        const catName = parsedUrl.query.catName;
        if (req.method === 'GET') {
            fs.readFile(views.editCat, 'utf-8', (err, result) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end();
                }
                fs.readFile(data.breeds, 'utf-8', (err, jsonArrBreeds) => {
                    if (err) {
                        res.statusCode = 404;
                        return res.end();
                    }
                    const breedsArr = JSON.parse(jsonArrBreeds);

                    const breedTemplates = breedsArr.map(breed => `<option value="${breed}">${breed}</option>`).join('')
                    fs.readFile(data.cats, 'utf-8', (err, jsonArr) => {
                        if (err) {
                            res.statusCode = 404;
                            return res.end();
                        }

                        const catsArr = JSON.parse(jsonArr);
                        const catObj = catsArr.find(obj => obj.name === catName);

                        let template = `<form action="/cats/edit?catName=${catName}" method="POST" class="cat-form">
                        <h2>Edit Cat</h2>
                        <label for="name">Name</label>
                        <input name="name" type="text" id="name" value="${catObj.name}">
                        <label for="description">Description</label>
                        <textarea name="description" id="description">${catObj.description}</textarea>
                        <label for="image">Image</label>
                        <input name="img" type="text" id="image" value="${catObj.img}">
                        <label for="group">Breed</label>
                        <select name="breed" id="group value="${catObj.breed}">
                            <h1>PlaceHolder</h1>
                        </select>
                        <button type="submit">Edit Cat</button>
                    </form>`;

                        const placeHolder = `<h1>PlaceHolder</h1>`;

                        const readyTemplate = template.replace(placeHolder, breedTemplates)

                        const renderedTemplate = result.replace(placeHolder, readyTemplate);
                        res.writeHead(200, { 'content-type': 'text/html' })
                        res.write(renderedTemplate);
                        res.end();
                    })
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
                    const index = catsArr.findIndex(cat => cat.name === catName);

                    if (index !== -1) {
                        catsArr[index].name = parsedBody.name;
                        catsArr[index].breed = parsedBody.breed;
                        catsArr[index].description = parsedBody.description;
                        catsArr[index].img = parsedBody.img;
                    }

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
    }
})


server.listen(5000);
console.log('Server is listening on port 5000...');