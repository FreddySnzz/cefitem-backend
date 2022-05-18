const express = require('express');
const RouterForCommercial = express.Router();
const AdminMiddeware = require('../middleware/AdminMiddleware');
const CommercialController = require('../controllers/CommercialController');


RouterForCommercial.get(
  '/',
  AdminMiddeware.ValidateADM,
  CommercialController.getCommercials
);

RouterForCommercial.post(
  '/edit',
  AdminMiddeware.ValidateADM,
  CommercialController.editCommercial
)


module.exports = RouterForCommercial;
