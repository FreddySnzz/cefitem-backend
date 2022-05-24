const { COSIF } = require('../models');

module.exports = {
  async getCOSIFs (request, response) {
    try {
      let getCOSIFs = await COSIF.findAll();

      response.status(200).json({ body: getCOSIFs });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editCOSIF (request, response) {
    try {
      let getCOSIF = await COSIF.findOne({ 
        raw: true,
        where: { prefecture_id: request.body.prefecture_id }
      });

      if ( getCOSIF == null || getCOSIF == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await COSIF.update({ status: !getCOSIF.status }, {
          where: { prefecture_id: request.body.prefecture_id } 
        });

        response.status(200).json({ message: 'COSIF edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};