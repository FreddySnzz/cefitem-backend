const express = require('express');
const RouterForPrefecture = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");
const PrefectureController = require('../controllers/PrefectureController');
const ParameterizationTIAF = require('../controllers/ParameterizationTIAFController');
const FileUploadMiddleware = require("../middleware/FileUpload").saveFile();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminMiddleware = require('../middleware/AdminMiddleware');

RouterForPrefecture.get(
  '/:id',
  AdminMiddleware.ValidateADM,
  PrefectureController.getPrefecture
);

RouterForPrefecture.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      cep: Joi.string().min(8).required(),
      uf: Joi.string().min(2).required(),
      city: Joi.string().required(),
      district: Joi.string().required(),
      address: Joi.string().required(),
      address_number: Joi.string().required(),
      complement: Joi.string().allow('', null),
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
      technical_telephone: Joi.string().min(8).required(),
      technical_cellphone: Joi.string().min(9).required(),
      contact_email: Joi.string().required(),
      prefecture_telephone: Joi.string().min(8).required(),
      prefecture_email: Joi.string().required()
    }),
  }),
  PrefectureController.registerPrefecture
);

RouterForPrefecture.patch(
  '/edit',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().allow('', null),
      cep: Joi.string().min(8).allow('', null),
      uf: Joi.string().min(2).allow('', null),
      city: Joi.string().allow('', null),
      district: Joi.string().allow('', null),
      address: Joi.string().allow('', null),
      address_number: Joi.string().allow('', null),
      complement: Joi.string().allow('', null),
      mayor_name: Joi.string().allow('', null),
      treasury_secretariat_name: Joi.string().allow('', null),
      secretary_name: Joi.string().allow('', null),
      secretary_position: Joi.string().allow('', null),
      collection_sector: Joi.string().allow('', null),
      responsible_for_the_collection_sector: Joi.string().allow('', null),
      position_of_the_responsible_for_the_collection_sector: Joi.string().allow('', null),
      taxman_position: Joi.string().allow('', null),
      taxman_name: Joi.string().allow('', null),
      taxman_registration: Joi.string().allow('', null),
      technical_contact_name: Joi.string().allow('', null),
      technical_telephone: Joi.string().min(8).allow('', null),
      technical_cellphone: Joi.string().min(9).allow('', null),
      contact_email: Joi.string().allow('', null),
      prefecture_telephone: Joi.string().min(8).allow('', null),
      prefecture_email: Joi.string().allow('', null)
    }),
  }),
  PrefectureController.editPrefecture
);

RouterForPrefecture.delete(
  '/delete',
  PrefectureController.deletePrefecture
);

RouterForPrefecture.post(
  '/upload',
  AuthMiddleware.validateJWT,
  FileUploadMiddleware.array('files', 3),
  PrefectureController.uploadFiles
);

RouterForPrefecture.post(
  '/register-tiaf',
  AdminMiddleware.ValidateADM,
  ParameterizationTIAF.registerTIAF
);

module.exports = RouterForPrefecture;
