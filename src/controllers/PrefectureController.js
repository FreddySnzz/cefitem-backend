const { Prefecture, Commercial, COSIF, COSIP, ERB, Hired, OwnISS, SubstituteISS } = require('../models');
const { generateJWT } = require('../functions/auth/GenerateJWT');
const { getJWTBody } = require('../functions/auth/getJWTBody');
const bcrypt = require('bcryptjs');

module.exports = {
  async registerPrefecture (request, response) {
    try {
      let verifyPrefectureByName = await Prefecture.findOne({ raw: true, 
        where: { name: request.body.name }});
      let verifyPrefectureByCity = await Prefecture.findOne({ raw: true, 
        where: { city: request.body.city }}); 

      if (verifyPrefectureByName == null || verifyPrefectureByName == undefined) {
        if (verifyPrefectureByCity == null || verifyPrefectureByCity == undefined) {

        let prefectureRegisted = await Prefecture.create(request.body);
        let jwtToken = await generateJWT({ id: prefectureRegisted.id });

        await Commercial.create({ prefecture_id: prefectureRegisted.id, status: false });
        await COSIF.create({ prefecture_id: prefectureRegisted.id, status: false });
        await COSIP.create({ prefecture_id: prefectureRegisted.id, status: false });
        await ERB.create({ prefecture_id: prefectureRegisted.id, status: false });
        await Hired.create({ prefecture_id: prefectureRegisted.id, status: false });
        await OwnISS.create({ prefecture_id: prefectureRegisted.id, status: false });
        await SubstituteISS.create({ prefecture_id: prefectureRegisted.id, status: false });

        response.status(201).json({ message: 'Prefecture registed', id: jwtToken });

        } else {
          response.status(401).json({ error: 'Unauthorized' });
        };

      } else {
        let jwtToken = await generateJWT({ id: verifyPrefectureByName.id });

        response.status(401).json({ message: "A prefecture has already been created with this city", id: jwtToken });
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async getPrefecture (request, response) {
    try {
      let getPrefecture = await Prefecture.findAll();
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
      let getPrefecture = await Prefecture.findOne({raw: true,
        where: {id: queryId}
      });

      if (queryId == null || queryId == undefined) {
        response.status(401).json({ error: "Unauthorized" });

      } else {
        await Prefecture.update(request.body, {
          where: { name: getPrefecture.name }
        });
  
        response.status(200).json({ message: 'Prefecture edited' });
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async deletePrefecture (request, response) {
    try {
      let queryId = request.query.id;

      if (queryId == null || queryId == undefined) {
        response.status(401).json({ error: "Unauthorized" });

      } else {
        let getPrefecture = await Prefecture.findOne({raw: true,
          where: {id: queryId}
        });
        
        if ( getPrefecture == null || getPrefecture == undefined ) {

          return response.status(400).json({ message: "This prefecture not exist" });

        } else {

          await Prefecture.destroy(getPrefecture, {
            where: { id: getPrefecture.id }
          });

          response.status(200).json({ message: 'Prefecture deleted' });
        };
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async uploadFiles (request, response) {
    try {
      let getToken = request.headers['authorization'];
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
      response.status(500).json({ error: error });
    }
  }
};
