const express = require('express');
const RouterForCOSIF = express.Router();
const AdminMiddeware = require('../middleware/AdminMiddleware');
const COSIFController = require('../controllers/COSIFController');


RouterForCOSIF.get(
  '/',
  AdminMiddeware.ValidateADM,
  COSIFController.getCOSIFs
);

RouterForCOSIF.post(
  '/edit',
  AdminMiddeware.ValidateADM,
  COSIFController.editCOSIF
);


module.exports = RouterForCOSIF;
