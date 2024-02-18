const Stone = require('../models/Stone');

exports.create = async (userId, stoneData) => {
    const createdStone = await Stone.create({
        owner: userId,
        ...stoneData,
    });
    return createdStone;
};

exports.getAll = () => Stone.find();

exports.getOneDetailed = (stoneId) => Stone.findById(stoneId).populate('likedList').populate('owner');

exports.like = async (stoneId, userId) => {
    await Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });
};

exports.getOne = (stoneId) => Stone.findById(stoneId);


exports.edit = (stoneId, newData) => Stone.findByIdAndUpdate(stoneId, newData, { runValidators: true });

exports.delete = (stoneId) => Stone.findByIdAndDelete(stoneId);

exports.getLatestThree = async () => {
    const stones = (await Stone.find().lean()).reverse();
    const arr = [];

    for (let i = 0; i < 3; i++) {
        if (stones[i] === undefined) {
            break;
        }
        arr.push(stones[i]);
    }

    return arr;
};

exports.search = (name) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }

    return Stone.find(query);
};

