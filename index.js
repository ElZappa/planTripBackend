const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

//Uso del servicio express y puerto a usar para escuchar.
const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://MyApp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido'));
    }
  }
};
app.use(cors(options));

routerApi(app); //Definicion el uso del router

//Uso de middlewares para el manejo de errores.
//Deben ser llamados siempre debajo de la definicion del router.
//Su ejecucion es secuencial, prestar atencion al orden de uso.
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//GET
app.get('/', (req, res) => {
  res.send('Hola este es mi servidor');
});

//GET
app.get('/test', (req, res) => {
  res.json({
    name: 'Test',
    result: 'success',
  });
});

//Escuchamos el puerto en el cual esta corriendo el servidor.
app.listen(port, () => {
  console.log('Mi port ' + port);
});
