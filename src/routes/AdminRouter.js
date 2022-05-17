const express = require('express');
const RouterForAdmin = express.Router();
const AuthMiddeware = require('../middleware/AuthMiddleware');
const AdminController = require('../controllers/AdminController');

RouterForAdmin.post(
  '/create',
  AuthMiddeware.validateJWT,
  AdminController.create
);

RouterForAdmin.delete(
  '/me',
  AuthMiddeware.validateJWT,
  AdminController.getAdmin
);

module.exports = RouterForFiles;
