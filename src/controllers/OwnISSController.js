const { OwnISS, Prefecture } = require('../models');

module.exports = {
  async getOwnISSs (request, response) {
    try {
      let getOwnISSs = await OwnISS.findAll();

      response.status(200).json({ body: getOwnISSs });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editOwnISS (request, response) {
    try {
      let getPrefecture = await Prefecture.findOne({ 
        raw: true,
        where: { id: request.body.prefecture_id }
      });

      let getOwnISS = await OwnISS.findOne({ 
        raw: true,
        where: { id: getPrefecture.own_iss_id }
      });

      if ( getOwnISS == null || getOwnISS == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await OwnISS.update({ status: !getOwnISS.status }, {
          where: { id: getPrefecture.own_iss_id } 
        });

        response.status(200).json({ message: 'OwnISS edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};