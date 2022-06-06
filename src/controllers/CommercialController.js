const { Commercial, Prefecture } = require('../models');

module.exports = {
  async getCommercials (request, response) {
    try {
      let getCommercials = await Commercial.findAll();

      response.status(200).json({ body: getCommercials });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editCommercial (request, response) {
    try {

      let getPrefecture = await Prefecture.findOne({ 
        raw: true,
        where: { id: request.body.prefecture_id }
      });

      let getCommercial = await Commercial.findOne({ 
        raw: true,
        where: { id: getPrefecture.commercial_id }
      });

      if ( getCommercial == null || getCommercial == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await Commercial.update({ status: !getCommercial.status }, {
          where: { id: getPrefecture.commercial_id } 
        });

        response.status(200).json({ message: 'Commercial edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};