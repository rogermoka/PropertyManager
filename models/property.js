const Joi = require('joi');
const mongoose = require('mongoose');

/*{
	"name": "Sobrado",
	"address":"Rua Oswaldo Cruz, 300",
	"description":"Predio comercial, alugado para eventos.",
	"size":"1958",
	"pricePerSquare":"4500",
	"gps":"-22.8849277,-47.0591357"
}*/

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 255
  },
  size: {
    type: Number,
    required: true
  },
  pricePerSquare: {
    type: Number,
    required: true
  },
  gps: {
      type: String
  }
  
});

const Property = mongoose.model('Property', propertySchema);

function validateProperty(Property) {
  const schema = {
    name: Joi.string().min(5).required(),
    address: Joi.string().min(5).required(),
    description: Joi.string().min(5),
    size: Joi.number().required(),
    pricePerSquare: Joi.number().required(),
    gps: Joi.string()
  };

  return Joi.validate(Property, schema);
}

exports.propertySchema = propertySchema;
exports.Property = Property; 
exports.validate = validateProperty;