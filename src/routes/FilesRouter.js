const express = require('express');
const RouterForFiles = express.Router();
const AuthMiddeware = require('../middleware/AuthMiddleware');
const FilesController = require('../controllers/FilesController');
const FileUpload = require('../middleware/FileUpload').saveFile();


RouterForFiles.put(
  '/edit',
  AuthMiddeware.validateJWT,
  FileUpload.single('files'),
  FilesController.cancelUpload
);

RouterForFiles.delete(
  '/cancel',
  AuthMiddeware.validateJWT,
  FilesController.cancelUpload
);

module.exports = RouterForFiles;
