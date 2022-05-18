const { OwnISS } = require('../models');

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
      let getOwnISS = await OwnISS.findOne({ raw: true,
        where: { prefecture_id: request.body.prefecture_id }
      });

      if ( getOwnISS == null || getOwnISS == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await OwnISS.update({ status: !getOwnISS.status }, {
          where: { prefecture_id: request.body.prefecture_id } 
        });

        response.status(200).json({ message: 'OwnISS edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};