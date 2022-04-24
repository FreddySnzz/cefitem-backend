// const express = require('express');
// const RouterForUser = express.Router();
// const { celebrate, Segments, Joi } = require('celebrate');
// const UserController = require('../controllers/UserController');
// const AuthMiddleware = require('../middleware/AuthMiddleware');

// RouterForUser.get(
//   '/',
//   AuthMiddleware.validateJWT,
//   UserController.getUsers
// ),

// RouterForUser.put(
//   '/change-password',
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       oldPhrase: Joi.string().required(),
//       newPhrase: Joi.string().required()
//     }),
//   }),
//   AuthMiddleware.validateJWT,
//   UserController.changePhrase
// ),

// RouterForUser.put(
//   '/change-nickname',
//   AuthMiddleware.validateJWT,
//   UserController.changeNickname
// )

// module.exports = RouterForUser;
