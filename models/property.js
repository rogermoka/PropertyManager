const Joi = require('joi');
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Property = mongoose.model('Property', propertySchema);

function validateProperty(Property) {
  const schema = {
    name: Joi.string().min(5).required()
  };

  return Joi.validate(Property, schema);
}

exports.propertySchema = propertySchema;
exports.Property = Property; 
exports.validate = validateProperty;