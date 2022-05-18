const { Commercial } = require('../models');

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
      let getCommercial = await Commercial.findOne({ raw: true,
        where: { prefecture_id: request.body.prefecture_id }
      });

      if ( getCommercial == null || getCommercial == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await Commercial.update({ status: !getCommercial.status }, {
          where: { prefecture_id: request.body.prefecture_id } 
        });

        response.status(200).json({ message: 'Commercial edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};