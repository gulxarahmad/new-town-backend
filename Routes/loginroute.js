const express = require('express');

const loginUser = require('../Controllers/loginUser');

const loginRoute = express.Router();

loginRoute.route('/').post(loginUser);

module.exports  = loginRoute;