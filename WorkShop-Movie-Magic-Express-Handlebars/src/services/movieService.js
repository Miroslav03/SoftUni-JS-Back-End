const Movie = require('../models/Movie');


exports.create = async (movieData) => Movie.create(movieData);


exports.getAll = () => Movie.find();


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
        _movies = _movies.filter(movie => movie.genre === genre);
    }

    if (year) {
        _movies = _movies.filter(movie => movie.year === year);
    }

    return _movies;
};

