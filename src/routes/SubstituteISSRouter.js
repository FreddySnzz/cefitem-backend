const express = require('express');
const RouterForOwnISS = express.Router();
const AdminMiddeware = require('../middleware/AdminMiddleware');
const OwnISSController = require('../controllers/OwnISSController');


RouterForOwnISS.get(
  '/',
  AdminMiddeware.ValidateADM,
  OwnISSController.getOwnISSs
);

RouterForOwnISS.post(
  '/edit',
  AdminMiddeware.ValidateADM,
  OwnISSController.editOwnISS
);


module.exports = RouterForOwnISS;
