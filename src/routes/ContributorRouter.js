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
)

RouterForContributor.put(
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
  ContributorController.updateContributor
);

RouterForContributor.delete(
  '/delete',
  AuthMiddleware.validateJWT,
  ContributorController.deleteContributor
);

module.exports = RouterForContributor;
