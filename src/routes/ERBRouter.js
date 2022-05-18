const express = require('express');
const RouterForERB = express.Router();
const AdminMiddeware = require('../middleware/AdminMiddleware');
const ERBController = require('../controllers/ERBController');


RouterForERB.get(
  '/',
  AdminMiddeware.ValidateADM,
  ERBController.getERBs
);

RouterForERB.post(
  '/edit',
  AdminMiddeware.ValidateADM,
  ERBController.editERB
);


module.exports = RouterForERB;
