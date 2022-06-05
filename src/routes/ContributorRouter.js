const express = require('express');
const RouterForContributor = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const ContributorController = require('../controllers/ContributorController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

RouterForContributor.get(
  '/me',
  AuthMiddleware.validateJWT,
  ContributorController.getContributor
);

RouterForContributor.post(
  '/change-password',
  AuthMiddleware.validateJWT,
  ContributorController.changePassword
);

RouterForContributor.put(
  '/update',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().allow('', null),
      contributor_position: Joi.string().allow('', null),
      contributor_registry: Joi.string().allow('', null),
      third_party: Joi.string().allow('', null),
      company_name: Joi.string().allow('', null),
      company_cnpj: Joi.string().allow('', null),
      email: Joi.string().email().allow('', null),
      cnpj: Joi.string().allow('', null),
      economic_activity: Joi.string().allow('', null),
      cep: Joi.string().allow('', null),
      uf: Joi.string().allow('', null),
      city: Joi.string().allow('', null),
      district: Joi.string().allow('', null),
      address: Joi.string().allow('', null),
      address_number: Joi.string().allow('', null),
      complement: Joi.string().allow('', null),
    }),
  }),
  AuthMiddleware.validateJWT,
  ContributorController.updateContributor
);

RouterForContributor.delete(
  '/delete',
  AuthMiddleware.validateJWT,
  ContributorController.deleteContributor
);

module.exports = RouterForContributor;
