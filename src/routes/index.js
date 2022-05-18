var express = require('express');
var RouterForIndex = express.Router();
var index = require('../models/index')

RouterForIndex.get(
  '/', function(request, response) {
    //console.log(index.models)
    response.status(200).json({ tittle: "Home page" });
  }
),

module.exports = RouterForIndex;
