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

exports.getOne = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.attach = async (cubeId, accId) => {
    const cube = await Cube.findById(cubeId);
    cube.accessories.push(accId);
    return cube.save();
}

exports.edit = async (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);