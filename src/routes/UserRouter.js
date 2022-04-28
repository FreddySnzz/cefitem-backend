const express = require('express');
const RouterForUser = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

RouterForUser.get(
  '/me',
  AuthMiddleware.validateJWT,
  UserController.getUser
);

RouterForUser.post(
  '/change-password',
  AuthMiddleware.validateJWT,
  UserController.changePassword
)

RouterForUser.put(
  '/update',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      contributor_position: Joi.string(),
      contributor_registry: Joi.string(),
      company_name: Joi.string(),
      company_cnpj: Joi.string(),
      email: Joi.string().email(),
      economic_activity: Joi.string(),
      cep: Joi.string(),
      uf: Joi.string(),
      city: Joi.string(),
      district: Joi.string(),
      address: Joi.string(),
      address_number: Joi.string(),
      complement: Joi.string()
    }),
  }),
  AuthMiddleware.validateJWT,
  UserController.updateUser
);

RouterForUser.delete(
  '/delete',
  AuthMiddleware.validateJWT,
  UserController.deleteUser
);

module.exports = RouterForUser;
