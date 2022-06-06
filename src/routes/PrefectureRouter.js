const express = require('express');
const RouterForPrefecture = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");
const PrefectureController = require('../controllers/PrefectureController');
const ParameterizationTIAF = require('../controllers/ParameterizationTIAFController');
const FileUploadMiddleware = require("../middleware/FileUpload").saveFile();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AdminMiddleware = require('../middleware/AdminMiddleware');

RouterForPrefecture.get(
  '/',
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
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      prefecture_id: Joi.string().required(),
      partner: Joi.string().required(),
      law_type: Joi.string().required(),
      law_number: Joi.string().required(),
      publication_date: Joi.string().required(),
      initial_article_tax: Joi.string().required(),
      final_article_tax: Joi.string().required(),
      monetary_correction: Joi.string().required(),
      dl_monetary_correction: Joi.string().required(),
      late_payment_interest: Joi.string().required(),
      dl_late_payment_interest: Joi.string().required(),
      moratorium_fine: Joi.string().required(), 
      limit_moratorium_fine: Joi.string().required(),
      aplication_moratorium_fine: Joi.string().required(),
      indexer: Joi.string().required(),
      indexer_name: Joi.string().required(),
      indexer_value: Joi.string().required(),
      effective_date: Joi.string().required(),
    }),
  }),
  AdminMiddleware.ValidateADM,
  ParameterizationTIAF.registerTIAF
);

RouterForPrefecture.post(
  '/edit-tiaf',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      prefecture_id: Joi.string().required(),
      partner: Joi.string().optional(),
      law_type: Joi.string().optional(),
      law_number: Joi.string().optional(),
      publication_date: Joi.string().optional(),
      initial_article_tax: Joi.string().optional(),
      final_article_tax: Joi.string().optional(),
      monetary_correction: Joi.string().optional(),
      dl_monetary_correction: Joi.string().optional(),
      late_payment_interest: Joi.string().optional(),
      dl_late_payment_interest: Joi.string().optional(),
      moratorium_fine: Joi.string().optional(), 
      limit_moratorium_fine: Joi.string().optional(),
      aplication_moratorium_fine: Joi.string().optional(),
      indexer: Joi.string().optional(),
      indexer_name: Joi.string().optional(),
      indexer_value: Joi.string().optional(),
      effective_date: Joi.string().optional(),
    }),
  }),  
  AdminMiddleware.ValidateADM,
  ParameterizationTIAF.editTIAF
);

RouterForPrefecture.get(
  '/get-tiaf/:id',
  AdminMiddleware.ValidateADM,
  ParameterizationTIAF.getTIAF
);

RouterForPrefecture.post(
  '/generate-document',
  AdminMiddleware.ValidateADM,
  ParameterizationTIAF.generateDocument
);



module.exports = RouterForPrefecture;
