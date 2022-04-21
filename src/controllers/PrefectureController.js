const { Prefecture } = require('../models');

module.exports = {
  async registerPrefecture (request, response) {
    try {
      let verifyPrefecture = await Prefecture.findOne({
        where: { name: request.body.name }
      });

      if (verifyPrefecture == null || verifyPrefecture == undefined) {
        await Prefecture.create(request.body);
        response.status(201).json({ message: 'Prefecture registed' });
      } else {
        response.status(401).json({ error: 'Unauthorized' });
      }

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    };
  },

  async getPrefecture (request, response) {
    try {
      let getPrefecture = await Prefecture.findAll(request.body);
      response.status(200).json({ body: getPrefecture });
    } catch (error) {
      response.status(500).json({ error: error });
    };
  },


};