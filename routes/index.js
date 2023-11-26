//Aca se debe definir
const airlineRouter = require('./airlines.router');
const usersRouter = require('./users.router');
//ETC...

function routerApi(app) {
  app.use('/airlines', airlineRouter);
  app.use('/users', usersRouter);
}

module.exports = routerApi;
