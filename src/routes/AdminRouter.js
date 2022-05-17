const express = require('express');
const RouterForAdmin = express.Router();
const AuthMiddeware = require('../middleware/AuthMiddleware');
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
  // AuthMiddeware.validateJWT,
  AdminController.create
);

RouterForAdmin.get(
  '/me',
  AuthMiddeware.validateJWT,
  AdminController.getAdmin
);

module.exports = RouterForAdmin;
