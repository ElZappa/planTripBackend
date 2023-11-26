//Aca se debe definir
const express = require('express');

const airlineRouter = require('./airlines.router');
const usersRouter = require('./users.router');
//ETC...

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/airlines', airlineRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
