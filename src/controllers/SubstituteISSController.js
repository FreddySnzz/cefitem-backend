const { SubstituteISS } = require('../models');

module.exports = {
  async getSubstituteISSs (request, response) {
    try {
      let getSubstituteISSs = await SubstituteISS.findAll();

      response.status(200).json({ body: getSubstituteISSs });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editSubstituteISS (request, response) {
    try {
      let getSubstituteISS = await SubstituteISS.findOne({ 
        raw: true,
        where: { prefecture_id: request.body.prefecture_id }
      });

      if ( getSubstituteISS == null || getSubstituteISS == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await SubstituteISS.update({ status: !getSubstituteISS.status }, {
          where: { prefecture_id: request.body.prefecture_id } 
        });

        response.status(200).json({ message: 'SubstituteISS edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};