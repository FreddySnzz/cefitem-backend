var express = require('express');
var RouterForAuth = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");
const AuthController = require('../controllers/AuthController');

RouterForAuth.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      contributor_position: Joi.string().allow('', null),
      contributor_registry: Joi.string().allow('', null),
      third_party: Joi.string().optional(),
      company_name: Joi.string().allow('', null),
      company_cnpj: Joi.string().allow('', null),
      email: Joi.string().email().required(),
      cnpj: Joi.string().allow('', null),
      economic_activity: Joi.string().allow('', null),
      cep: Joi.string().required(),
      uf: Joi.string().required(),
      city: Joi.string().required(),
      district: Joi.string().allow('', null),
      address: Joi.string().required(),
      address_number: Joi.string().allow('', null),
      complement: Joi.string().allow('', null),
      phrase: Joi.string().required(),
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
