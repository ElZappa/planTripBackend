const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(5);
const image = Joi.string().uri();

const createAirlineSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateAirlineSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getAirlineSchema = Joi.object({
  id: id.required(),
});


module.exports = { createAirlineSchema, updateAirlineSchema, getAirlineSchema }
