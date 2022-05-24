const { ParameterizationTIAF, Prefecture } = require('../models');

module.exports = {
  async registerTIAF ( request, response ) {
    try {
      let getPrefecture = request.body.prefecture_id;
      let verifyPrefecture = await Prefecture.findByPk(getPrefecture);

      if ( verifyPrefecture == null || verifyPrefecture == undefined ) {

        response.status(400).json({ error: "Prefecture not found" });

      } else {
        let verifyTIAF = await ParameterizationTIAF.findOne({
          raw: true,
          where: { prefecture_id: getPrefecture }
        })

        if (verifyTIAF == null || verifyTIAF == undefined) {

          await ParameterizationTIAF.create(request.body);
          response.status(200).json({ message: "Parameterization TIAF Created" });

        } else {

          response.status(401).json({ error: "This Prefecture already registed in Parameterization TIAF" });

        };
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editTIAF ( request, response ) {
    try {
      let getPrefecture = request.body.prefecture_id;
      let verifyPrefecture = await Prefecture.findByPk(getPrefecture);

      if ( verifyPrefecture == null || verifyPrefecture == undefined ) {

        response.status(400).json({ error: "Prefecture not found" });

      } else {

        await ParameterizationTIAF.update(request.body, {
          where: { id: request.body.id }
        });

        response.status(200).json({ message: "Parameterization TIAF Edited" });

      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async getTIAF ( request, response ) {
    try {
      let prefectureId  = request.params.id;
      let getTIAF = await ParameterizationTIAF.findOne({
        raw: true,
        where: { prefecture_id: prefectureId },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

      response.status(200).json({ body: getTIAF });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};