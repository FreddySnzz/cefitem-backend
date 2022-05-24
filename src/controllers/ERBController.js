const { ERB } = require('../models');

module.exports = {
  async getERBs (request, response) {
    try {
      let getERBs = await ERB.findAll();

      response.status(200).json({ body: getERBs });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editERB (request, response) {
    try {
      let getERB = await ERB.findOne({ 
        raw: true,
        where: { prefecture_id: request.body.prefecture_id }
      });

      if ( getERB == null || getERB == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await ERB.update({ status: !getERB.status }, {
          where: { prefecture_id: request.body.prefecture_id } 
        });

        response.status(200).json({ message: 'ERB edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};