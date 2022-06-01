const { ERB, Prefecture } = require('../models');

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
      let getPrefecture = await Prefecture.findOne({ 
        raw: true,
        where: { id: request.body.prefecture_id }
      });

      let getERB = await ERB.findOne({ 
        raw: true,
        where: { id: getPrefecture.erb_id }
      });

      if ( getERB == null || getERB == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await ERB.update({ status: !getERB.status }, {
          where: { id: getPrefecture.erb_id } 
        });

        response.status(200).json({ message: 'ERB edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};