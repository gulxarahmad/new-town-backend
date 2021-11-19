const express = require('express');

const registerUser = require('../Controllers/registerUser');

const Routes = express.Router();

Routes.route('/').post(registerUser);

module.exports  = Routes;