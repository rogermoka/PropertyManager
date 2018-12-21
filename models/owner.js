const Joi = require('joi');
const mongoose = require('mongoose');

const Owner = mongoose.model('Owner', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  cota: {
    type: Number,
    required: true,
  }
}));

function validateOwner(owner) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    cota: Joi.string().required()
  };

  return Joi.validate(owner, schema);
}

exports.Owner = Owner; 
exports.validate = validateOwner;