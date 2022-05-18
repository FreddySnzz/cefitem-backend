var express = require('express');
var RouterForAuth = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");
const AuthController = require('../controllers/AuthController');

RouterForAuth.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      contributor_position: Joi.string().required(),
      contributor_registry: Joi.string().required(),
      company_name: Joi.string().allow('', null),
      company_cnpj: Joi.string().allow('', null),
      email: Joi.string().email().required(),
      economic_activity: Joi.string().required(),
      cep: Joi.string().required(),
      uf: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      address: Joi.string().required(),
      address_number: Joi.string().required(),
      complement: Joi.string().required(),
      phrase: Joi.string().min(8).required()
    }),
  }),
  AuthController.createContributor
);

RouterForAuth.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      phrase: Joi.string().min(8).required()
    }),
  }),
  AuthController.authUser
);

RouterForAuth.post(
  '/enable',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      token: Joi.string().required()
    }),
  }),
  AuthController.enableContributor
);

RouterForAuth.post(
  '/send_token',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required()
    }),
  }),
  AuthController.sendTokenRecovery
);

RouterForAuth.post(
  '/recovery',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      token: Joi.string().required(),
      new_phrase: Joi.string().required()
    }),
  }),
  AuthController.recoveryPhrase
);


module.exports = RouterForAuth;
