const express = require('express');
const RouterForCommercial = express.Router();
const AuthMiddeware = require('../middleware/AuthMiddleware');
const CommercialController = require('../controllers/CommercialController');


RouterForCommercial.get(
  '/',
  CommercialController.getCommercials
);

RouterForCommercial.post(
  '/register',
  AuthMiddeware.validateJWT,
  CommercialController.registerCommercial
)


module.exports = RouterForCommercial;
