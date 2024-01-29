const Accessory = require("../models/Accessory");


exports.create = (data) => Accessory.create(data);

exports.getAll = () => Accessory.find();

