const Cube = require('../models/Cube');

exports.searchCube = (title, difficulty1, difficulty2) => {
    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }

    if (difficulty1 && difficulty2) {
        query.difficulty = { $gte: difficulty1, $lte: difficulty2 };
    } else if (difficulty1) {
        query.difficulty = { $gte: difficulty1 };
    } else if (difficulty2) {
        query.difficulty = { $lte: difficulty2 };
    }

    return Cube.find(query);
};

exports.addCube = (cubeData) => Cube.create(cubeData);


exports.getOne = (id) => {
    const cube = cubes.filter(cube => cube._id == id);
    return cube;
};