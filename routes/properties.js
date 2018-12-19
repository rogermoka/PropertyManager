const {Property, validate} = require('../models/property');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const property = await Property.find().sort('name');
  res.send(property);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let property = new Property({ name: req.body.name });
  property = await property.save();
  
  res.send(property);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const property = await Property.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!property) return res.status(404).send('The property with the given ID was not found.');
  
  res.send(property);
});

router.delete('/:id', async (req, res) => {
  const property = await Property.findByIdAndRemove(req.params.id);

  if (!property) return res.status(404).send('The property with the given ID was not found.');

  res.send(property);
});

router.get('/:id', async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) return res.status(404).send('The property with the given ID was not found.');

  res.send(property);
});

module.exports = router;