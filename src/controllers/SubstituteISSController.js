const { SubstituteISS, Prefecture } = require('../models');

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
      let getPrefecture = await Prefecture.findOne({ 
        raw: true,
        where: { id: request.body.prefecture_id }
      });

      let getSubstituteISS = await SubstituteISS.findOne({ 
        raw: true,
        where: { id: getPrefecture.substitute_iss_id }
      });

      if ( getSubstituteISS == null || getSubstituteISS == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await SubstituteISS.update({ status: !getSubstituteISS.status }, {
          where: { id: getPrefecture.substitute_iss_id } 
        });

        response.status(200).json({ message: 'SubstituteISS edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};