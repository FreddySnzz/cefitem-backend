const { Hired } = require('../models');

module.exports = {
  async getHireds (request, response) {
    try {
      let getHireds = await Hired.findAll();

      response.status(200).json({ body: getHireds });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editHired (request, response) {
    try {
      let getHired = await Hired.findOne({ 
        raw: true,
        where: { prefecture_id: request.body.prefecture_id }
      });

      if ( getHired == null || getHired == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await Hired.update({ status: !getHired.status }, {
          where: { prefecture_id: request.body.prefecture_id } 
        });

        response.status(200).json({ message: 'Hired edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};