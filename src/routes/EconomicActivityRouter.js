const express = require('express');
const RouterForActivity = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const EconomicActivityController = require('../controllers/EconomicActivityController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

RouterForActivity.get(
  '/',
  EconomicActivityController.getActivities,
  AuthMiddleware.validateJWT
);

RouterForActivity.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      activity_name: Joi.string().required(),
    }),
  }),
  AuthMiddleware.validateJWT,
  EconomicActivityController.registerActivity,
  
);

RouterForActivity.put(
  '/edit',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      activity_name: Joi.string().optional(),
    }),
  }),
  AuthMiddleware.validateJWT,
  EconomicActivityController.editActivity,
  
);

RouterForActivity.delete(
  '/delete',
  AuthMiddleware.validateJWT,
  EconomicActivityController.deleteActivity,
  
);

module.exports = RouterForActivity;
