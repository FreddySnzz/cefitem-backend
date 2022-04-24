const express = require('express');
const RouterForActivity = express.Router();
//const { celebrate, Segments, Joi } = require('celebrate');
const EconomicActivityController = require('../controllers/EconomicActivityController');
//const AuthMiddleware = require('../middleware/AuthMiddleware');

RouterForActivity.get(
  '/',
  EconomicActivityController.getActivities
);

RouterForActivity.post(
  '/register',
  EconomicActivityController.registerActivity
);

RouterForActivity.put(
  '/edit',
  EconomicActivityController.editActivity
);

RouterForActivity.delete(
  '/delete',
  EconomicActivityController.deleteActivity
);

module.exports = RouterForActivity;
