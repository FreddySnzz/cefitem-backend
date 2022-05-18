const express = require('express');
const RouterForCOSIP = express.Router();
const AdminMiddeware = require('../middleware/AdminMiddleware');
const COSIPController = require('../controllers/COSIPController');


RouterForCOSIP.get(
  '/',
  AdminMiddeware.ValidateADM,
  COSIPController.getCOSIPs
);

RouterForCOSIP.post(
  '/edit',
  AdminMiddeware.ValidateADM,
  COSIPController.editCOSIP
);


module.exports = RouterForCOSIP;
