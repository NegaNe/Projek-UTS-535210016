const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const { errors } = require('celebrate');

const config = require('./config');
const routesV1 = require('../api/v1');

const app = express();

//set view engine ejs
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
  res.render ('pages/index');
  // res.send('hello');
});


// handles if you're behind a reverse proxy
app.enable('trust proxy');

// handles cross origin resource sharing (CORS)
app.use(cors());

// enable passport for API authorization
app.use(passport.initialize());

// lets u use HTTP verbs such as PUT or DELETE when the client dosen't support it
app.use(require('method-override')());

// transforms raw string to json
app.use(bodyParser.json());

// enables file uploads via multipart/form-data
app.use(bodyParser.urlencoded({ extended: false }));

// load API routes
app.use('/api', routesV1());

// error handling
// enable error logging to stderr
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

// error handlers for validation using celebrate
app.use(errors());

// catch all other errors
app.use((err, req, res, next) => {
  if (err.status === 401) {
    return res.status(err.status)
      .send({
        statusCode: 401,
        error: 'Unauthorized access',
        message: err.message,
      })
      .end();
  }

  return res.status(err.status || 500)
    .send({
      statusCode: err.status || 500,
      error: 'Internal server error',
      message: err.message,
    })
    .end();
});

module.exports = app;
