const { getJWTBody } = require('../functions/auth/getJWTBody');
const { Admin, Contributor } = require('../models');

module.exports = {
  async ValidateADM (request, response, next) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);

      let verifyUser = await Admin.findOne({ raw: true,
        where: { id: getId }
      });

      if (verifyUser == null || verifyUser == undefined) {
        response.status(401).json({ message: 'Not Authorized' });

      } else {
        next();
      };

    } catch ( error ) {
      console.log(error)
      response.status(500).json({ error: error })
    };
  },

}
