const { COSIP } = require('../models');

module.exports = {
  async getCOSIPs (request, response) {
    try {
      let getCOSIPs = await COSIP.findAll();

      response.status(200).json({ body: getCOSIPs });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editCOSIP (request, response) {
    try {
      let getCOSIP = await COSIP.findOne({ 
        raw: true,
        where: { prefecture_id: request.body.prefecture_id }
      });

      if ( getCOSIP == null || getCOSIP == undefined ) {

        return response.status(401).json({ message: Unauthorized });

      } else {

        await COSIP.update({ status: !getCOSIP.status }, {
          where: { prefecture_id: request.body.prefecture_id } 
        });

        response.status(200).json({ message: 'COSIP edited' });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};