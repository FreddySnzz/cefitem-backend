const { COSIF, Prefecture } = require('../models');

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

      let getPrefecture = await Prefecture.findOne({ 
        raw: true,
        where: { id: request.body.prefecture_id }
      });

      let getCOSIF = await COSIF.findOne({ 
        raw: true,
        where: { id: getPrefecture.cosif_id }
      });

      if ( getCOSIF == null || getCOSIF == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await COSIF.update({ status: !getCOSIF.status }, {
          where: { id: getPrefecture.cosif_id } 
        });

        response.status(200).json({ message: 'COSIF edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};