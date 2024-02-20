const Furniture = require('../models/Furniture');

exports.getAll = (userId) => {
    let query = Furniture.find();

    if (userId) {
        query = query.findOne({ owner: userId })
    }

    return Furniture.find(query)
}

exports.create = async (furnitureData, userId) => {
    await Furniture.create({
        owner: userId,
        ...furnitureData,
    });
}

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.update = (newData, furnitureId) => Furniture.findByIdAndUpdate(furnitureId, newData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);