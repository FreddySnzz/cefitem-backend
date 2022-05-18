const express = require('express');
const RouterForHired = express.Router();
const AdminMiddeware = require('../middleware/AdminMiddleware');
const HiredController = require('../controllers/HiredController');


RouterForHired.get(
  '/',
  AdminMiddeware.ValidateADM,
  HiredController.getHireds
);

RouterForHired.post(
  '/edit',
  AdminMiddeware.ValidateADM,
  HiredController.editHired
);


module.exports = RouterForHired;
