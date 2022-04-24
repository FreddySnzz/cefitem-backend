var express = require('express');
var RouterForIndex = express.Router();

RouterForIndex.get(
  '/', function(request, response) {
    response.status(200).json({ tittle: "Home page" });
  }
),

module.exports = RouterForIndex;
