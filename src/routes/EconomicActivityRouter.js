const express = require('express');
const RouterForActivity = express.Router();
//const { celebrate, Segments, Joi } = require('celebrate');
const EconomicActivityController = require('../controllers/EconomicActivityController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

RouterForActivity.get(
  '/',
  EconomicActivityController.getActivities,
  AuthMiddleware.validateJWT
);

RouterForActivity.post(
  '/register',
  EconomicActivityController.registerActivity,
  AuthMiddleware.validateJWT
);

RouterForActivity.put(
  '/edit',
  EconomicActivityController.editActivity,
  AuthMiddleware.validateJWT
);

RouterForActivity.delete(
  '/delete',
  EconomicActivityController.deleteActivity,
  AuthMiddleware.validateJWT
);

module.exports = RouterForActivity;
