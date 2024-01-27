const Movie = require('../models/Movie');


exports.create = async (movieData) => Movie.create(movieData);


exports.getAll = () => Movie.find();


exports.getOne = (id) => Movie.findById(id).populate('casts');


exports.getStars = async (id) => {
    const movie = await this.getOne(id).lean();
    const starArr = new Array(Number(movie.rating)).fill(1);
    return starArr;
};

exports.search = (title, genre, year) => {
    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }

    if (genre) {
        query.genre = genre;
    }

    if (year) {
        query.year = year;
    }

    return Movie.find(query);
};

exports.attachCast = async (movieId, castId) => {
    const movie = await this.getOne(movieId);
    movie.casts.push(castId);
    return movie.save();
};