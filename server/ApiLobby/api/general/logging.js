
module.exports.timestamp = timestamp;
module.exports.logErrors = logErrors;
module.exports.clientErrorHandler = clientErrorHandler;
module.exports.errorHandler = errorHandler;

function timestamp(req, res, next) {
  console.log('Time:', Date.now(), "\n" + "api: " + req.url)
  next()
}


function logErrors(err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
function errorHandler(err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

