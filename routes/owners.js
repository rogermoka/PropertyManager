const {Owner, validate} = require('../models/owner'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const owners = await Owner.find().sort('name');
  res.send(owners);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let owner = new Owner({ 
    name: req.body.name,
    cota: req.body.cota
  });
  owner = await owner.save();
  
  res.send(owner);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const owner = await Owner.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      cota: req.body.cota
    }, { new: true });

  if (!owner) return res.status(404).send('The owner with the given ID was not found.');
  
  res.send(owner);
});

router.delete('/:id', async (req, res) => {
  const owner = await Owner.findByIdAndRemove(req.params.id);

  if (!owner) return res.status(404).send('The owner with the given ID was not found.');

  res.send(owner);
});

router.get('/:id', async (req, res) => {
  const owner = await Owner.findById(req.params.id);

  if (!owner) return res.status(404).send('The owner with the given ID was not found.');

  res.send(owner);
});

module.exports = router; 