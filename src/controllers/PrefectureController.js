const { Prefecture } = require('../models');
const { generateJWT } = require('../functions/auth/GenerateJWT');
const { getJWTBody } = require('../functions/auth/getJWTBody');
const bcrypt = require('bcryptjs');

module.exports = {
  async registerPrefecture (request, response) {
    try {
      let verifyPrefecture = await Prefecture.findOne({
        where: {name: request.body.name}
      });

      if (verifyPrefecture == null || verifyPrefecture == undefined) {
        let prefectureRegisted = await Prefecture.create(request.body);
        let jwtToken = await generateJWT({ id: prefectureRegisted.id });

        const salt = await bcrypt.genSalt(10);
        let phraseEncrypted = await bcrypt.hashSync(request.body.phrase, salt);
        request.body.phrase = phraseEncrypted;

        response.status(201).json({ message: 'Prefecture registed', id: jwtToken });

      } else {
        response.status(401).json({ error: 'Unauthorized' });
      };

    } catch (error) {
      console.log(error);
      response.status(500).json({ error: error });
    };
  },

  async getPrefecture (request, response) {
    try {
      let getPrefecture = await Prefecture.findAll(request.body);
      let queryId = request.query.id;

      if ( queryId > 0 ) {
        let getPrefecture = await Prefecture.findOne({
          where: {id: request.query.id}
        });
        response.status(200).json({ body: getPrefecture });
      } else {
        response.status(200).json({ body: getPrefecture });
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editPrefecture (request, response) {
    try {
      let queryId = request.query.id;
      let getPrefecture = await Prefecture.findByPk(queryId);

      await Prefecture.update(request.body, {
        where: {id: queryId}
      });

      response.status(200).json({ message: 'Prefecture edited' });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async deletePrefecture (request, response) {
    try {
      let queryId = request.query.id;

      let getPrefecture = await Prefecture.findByPk(queryId);
      await getPrefecture.destroy();

      response.status(200).json({ message: 'Prefecture deleted' });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async uploadFiles (request, response) {
    try {

      let getToken = request.headers['Authorization'];
      let getId = await getJWTBody(getToken);


      let verifyPrefecture = await Prefecture.findOne({
        where: { id: getId }
      });

      if (verifyPrefecture == null || verifyPrefecture == undefined) {
        response.status(401).json({ message: 'Prefecture not fount' });
      }

      response.status(200).json({ message: verifyPrefecture });

    }
    catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    }
  }
};
