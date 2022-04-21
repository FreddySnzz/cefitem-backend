const express = require('express');
const RouterForPrefecture = express.Router();
//const { celebrate, Segments, Joi } = require("celebrate");
const PrefectureController = require('../controllers/PrefectureController');
//const AuthMiddleware = require('../middleware/AuthMiddleware');

RouterForPrefecture.get(
  '/',
  PrefectureController.getPrefecture
)

RouterForPrefecture.post(
  '/register',
  //AuthMiddleware.validateJWT,
  PrefectureController.registerPrefecture
);

module.exports = RouterForPrefecture;