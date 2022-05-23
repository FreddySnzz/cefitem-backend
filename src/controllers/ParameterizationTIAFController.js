const { ParameterizationTIAF, Prefecture } = require('../models');
const { generateJWT } = require('../functions/auth/GenerateJWT');
const { getJWTBody } = require('../functions/auth/getJWTBody');

module.exports = { // ADMIN COMUNS PODEM REGISTRAR
  async registerTIAF ( request, response ) {
    try {

      let getPrefecture = request.body.prefecture_id;
      let verifyPrefecture = await Prefecture.findByPk(getPrefecture);

      if ( verifyPrefecture == null || verifyPrefecture == undefined ) {

        response.status(400).json({ error: "Prefecture not found" });

      } else {

        await ParameterizationTIAF.create( request.body );
        response.status(200).json({ message: "Parameterization TIAF Created" });

      };


    } catch (error) {

      response.status(500).json({ error: error });

    };
  },

};