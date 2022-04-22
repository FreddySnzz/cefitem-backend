const express = require('express');
const RouterForPrefecture = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");
const PrefectureController = require('../controllers/PrefectureController');

RouterForPrefecture.get(
  '/',
  PrefectureController.getPrefecture
);

RouterForPrefecture.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cep: Joi.number().min(8).required(),
      uf: Joi.string().min(2).required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      address: Joi.string().required(),
      address_number: Joi.string().required(),
      complement: Joi.string().required(),
      mayor_name: Joi.string().required(),
      treasury_secretariat_name: Joi.string().required(),
      secretary_name: Joi.string().required(),
      secretary_position: Joi.string().required(),
      collection_sector: Joi.string().required(),
      responsible_for_the_collection_sector: Joi.string().required(),
      position_of_the_responsible_for_the_collection_sector: Joi.string().required(),
      taxman_position: Joi.string().required(),
      taxman_name: Joi.string().required(),
      taxman_registration: Joi.string().required(),
      technical_contact_name: Joi.string().required(),
      technical_telephone: Joi.number().min(8).required(),
      technical_cellphone: Joi.number().min(9).required(),
      contact_email: Joi.string().required(),
      prefecture_telephone: Joi.number().min(8).required(),
      prefecture_email: Joi.string().required(),
    }),
  }),
  PrefectureController.registerPrefecture
);

RouterForPrefecture.patch(
  '/edit',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cep: Joi.number().min(8).required(),
      uf: Joi.string().min(2).required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      address: Joi.string().required(),
      address_number: Joi.string().required(),
      complement: Joi.string().required(),
      mayor_name: Joi.string().required(),
      treasury_secretariat_name: Joi.string().required(),
      secretary_name: Joi.string().required(),
      secretary_position: Joi.string().required(),
      collection_sector: Joi.string().required(),
      responsible_for_the_collection_sector: Joi.string().required(),
      position_of_the_responsible_for_the_collection_sector: Joi.string().required(),
      taxman_position: Joi.string().required(),
      taxman_name: Joi.string().required(),
      taxman_registration: Joi.string().required(),
      technical_contact_name: Joi.string().required(),
      technical_telephone: Joi.number().min(8).required(),
      technical_cellphone: Joi.number().min(9).required(),
      contact_email: Joi.string().required(),
      prefecture_telephone: Joi.number().min(8).required(),
      prefecture_email: Joi.string().required(),
    }),
  }),
  PrefectureController.editPrefecture
);

RouterForPrefecture.delete(
  '/delete',
  PrefectureController.deletePrefecture
);

module.exports = RouterForPrefecture;