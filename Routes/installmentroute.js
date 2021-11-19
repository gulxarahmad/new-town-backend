const express = require('express');

const installment = require('../Controllers/Installments');

const InstallmentRoute = express.Router();

InstallmentRoute.route('/').post(installment);

module.exports  = InstallmentRoute;