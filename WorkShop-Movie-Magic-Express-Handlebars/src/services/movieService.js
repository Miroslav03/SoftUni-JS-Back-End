const Movie = require('../models/Movie');


exports.create = async (movieData) => Movie.create(movieData);


exports.getAll = () => Movie.find();


exports.getOne = (id) => Movie.findById(id);


exports.getStars = async (id) => {
    const movie = await this.getOne(id).lean();
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

exports.attachCast = async (movieId, castId) => {
    const movie = await this.getOne(movieId);
    movie.casts.push(castId);
    return movie.save();
};