const Creature = require('../models/Creature');
const User = require('../models/User');

exports.create = async (userId, creatureData) => {
    const createdCreature = await Creature.create({
        owner: userId,
        ...creatureData,
    });
    await User.findByIdAndUpdate(userId, { $push: { addedCreature: createdCreature._id } });
    return createdCreature;
};

exports.getAll = () => Creature.find();

exports.getOneDetailed = (creatureId) => Creature.findById(creatureId).populate('votes').populate('owner');

exports.getOneDetailedUser = (userId) => User.findById(userId).populate('addedCreature').populate('votedCreatures')

exports.sign = async (cretureId, userId) => {
    await Creature.findByIdAndUpdate(cretureId, { $push: { votes: userId } });
    await User.findByIdAndUpdate(userId, { $push: { votedCreatures: cretureId } });
};


exports.edit = (creatureId, newData) => Creature.findByIdAndUpdate(creatureId, newData, { runValidators: true });

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);
