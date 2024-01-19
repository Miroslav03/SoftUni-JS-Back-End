const movies = [{
    _id: 1,
    title: 'Harry Potter and the Deathly Hallows Part 1',
    genre: 'Action',
    director: 'David Yates',
    year: '2011',
    imageUrl: '/img/Harry Potter.jpg',
    rating: '5',
    description: 'As Harry, Ron and Hermione race against time and evil to destroy the Horcruxes, they uncover the existence of the three most powerful objects in the wizarding world: the Deathly Hallows.'
}, {
    _id: 2,
    title: 'Shrek',
    genre: 'Comedy',
    director: 'Andrew Adamson',
    year: '2001',
    imageUrl: '/img/Shrek.jpg',
    rating: '5',
    description: 'Shrek is an anti-social and highly territorial ogre who loves the solitude of his swamp, and enjoys fending off mobs and intruders. His life is interrupted after the dwarfish Lord Farquaad of Duloc exiles a vast number of fairy-tale creatures, who inadvertently end up in the swamp.'
}];

exports.create = (movieData) => {
    movieData._id = movies.length + 1
    movies.push(movieData);
};

exports.getAll = () => {
    return movies.slice();//Deep copy to cut the reference to original arr
};

exports.getOne = (id) => {
    return movies.find(movie => movie._id == id);
};

exports.getStars = (id) => {
    const movie = movies.find(movie => movie._id == id);
    const starArr = new Array(Number(movie.rating)).fill(1);
    return starArr;
};

exports.search = (title, genre, year) => {
    let _movies = movies.slice();

    if (title) {
        _movies = _movies.filter(movie => movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }

    if (genre) {
        _movies = _movies.filter(movie => movie.genre === genre)
    }

    if (year) {
        _movies = _movies.filter(movie => movie.year === year)
    }

    return _movies;
};

