function logErrors(err, req, res, next) {
  console.log('log error');
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('error handdler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  console.log('boom error handdler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
