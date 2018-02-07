'use strict';

// load the configuration file
const config = require('./app/config');

// load authentication config
const passport = require('./app/config/passport');

// initialize and start the express app
const express = require('./app/core/express');
express.start(passport);
const app = express.getApp();

// start the express api
const api = require('./app/core/api')(app);

/**
 * GET *
 * @param  {Object} req  express request object
 * @param  {Object} res  express response object
 */
app.get(/.*/, function(req, res) {
    res.status(404).send(`There is no "${req.path}" here!`);
});

// start listening on the specified port
app.listen(config.serverPort, function() {
    console.log(`Listening on ${config.serverPort}.`);
});


