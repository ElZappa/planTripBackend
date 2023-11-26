const express = require('express');

const router = express.Router();
const AirlinesService = require('../services/airline.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createAirlineSchema,
  updateAirlineSchema,
  getAirlineSchema,
} = require('../schemas/airline.schema');

const service = new AirlinesService();

router.get('/allAirlines', async (req, res) => {
  // const { id } = req.params;
  const allAirlines = await service.GetAll();
  res.json(allAirlines);
});

//GET
router.get('/:id',
validatorHandler(getAirlineSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id >= 999)
      res.status(404).json({
        message: 'not found',
      });
    else {
      const airline = await service.FindOne(id);
      res.json(airline);
    }
  } catch (error) {
    next(error);
  }
});

//POST
router.post('/newAirline',
validatorHandler(createAirlineSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newAirline = await service.create(body);
  res.status(201).json(newAirline);
});

//PATCH
router.patch('/updateAirline/:id',
  validatorHandler(getAirlineSchema, 'params'),
  validatorHandler(createAirlineSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const airline = await service.update(id, body);
    res.json(airline);
  }
);

//DELETE
router.delete('/deleteAirline/:id',
validatorHandler(createAirlineSchema, 'body'),
async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
