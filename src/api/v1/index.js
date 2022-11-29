const express = require('express');

const auth = require('./routes/auth');

module.exports = () => {
  const app = express.Router();

  auth(app);

  return app;
};
