const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/:userId', (req, res) => {
  const { id } = req.params;
  res.json({
    name: faker.company.name(),
    edad: 26,
    id: id,
  });
});

module.exports = router;
