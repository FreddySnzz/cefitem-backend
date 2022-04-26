const jwt = require('jsonwebtoken');

module.exports = {
  async getJWTBody (token) {
    let newToken = token.split(' ');
    let id;
    try {
      if (newToken[1]) {
        jwt.verify(newToken[1], process.env.JWT_SECRET, function(error, decoded) {
          if (error) {
            console.log(error);
          } else {
            id = decoded.id
          };
        });
        return id;
      } else {
        console.log( 'error: token not found' );
      };
    } catch (error) {
      console.log(error);
    };
  }
};