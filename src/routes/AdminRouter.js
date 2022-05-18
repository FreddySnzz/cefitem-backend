const express = require('express');
const RouterForAdmin = express.Router();
const AuthMiddeware = require('../middleware/AuthMiddleware');
const AdminMiddleware = require('../middleware/AdminMiddleware');
const AdminController = require('../controllers/AdminController');
const { celebrate, Segments, Joi } = require("celebrate");

RouterForAdmin.post(
  '/create',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      name: Joi.string().required(),
      phrase: Joi.string().min(8).required()
    }),
  }),
  AdminMiddleware.ValidateADM,
  AdminController.createAdmin
);

RouterForAdmin.get(
  '/me',
  AdminMiddleware.ValidateADM,
  AdminController.getAdmin
);

module.exports = RouterForAdmin;

