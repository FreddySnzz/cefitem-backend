const jwt = require('jsonwebtoken');

module.exports = {
  async validateJWT (request, response, next) {
    try {
      let getToken = request.headers['authorization'];
      getToken = getToken.split(' ');

      if (getToken[1]) {
        let secureToken = process.env.JWT_SECRET
        jwt.verify(getToken[1], secureToken, function(erro, decoded) {

          if(decoded) {
            next();
          } else {
            response.status(401).json({ 'Error': 'Not Authorized' });
          }
        });
      } else {
        response.status(403).json({ 'Error': 'Method now allowed' });
      };
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    };
  }
};
