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

exports.difficultyLevelOptions = (cubeDifficulty) => {
    const data = {
        1: 'Very Easy',
        2: 'Easy',
        3: 'Medium (Standard 3x3)',
        4: 'Intermediate',
        5: 'Expert',
        6: 'Hardcore',
    }
    const difficultyArr = [];

    difficultyArr.push({ value: Number(cubeDifficulty), name: `${cubeDifficulty} - ${data[cubeDifficulty]}` });

    for (const [key, value] of Object.entries(data)) {
        if (key !== cubeDifficulty) {
            difficultyArr.push({ value: Number(key), name: `${key} - ${value}` });
        }
    }

    return difficultyArr
};

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId)