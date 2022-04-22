const { Prefecture } = require('../models');

module.exports = {
  async registerPrefecture (request, response) {
    try {
      let verifyPrefecture = await Prefecture.findOne({
        where: {name: request.body.name}
      });

      if (verifyPrefecture == null || verifyPrefecture == undefined) {
        await Prefecture.create(request.body);

        response.status(201).json({ message: 'Prefecture registed' });

      } else {
        response.status(401).json({ error: 'Unauthorized' });
      }

    } catch (error) {
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
      console.log(error)
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
      console.log(error)
      response.status(500).json({ error: error });
    };
  }
};