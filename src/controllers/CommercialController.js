const { Prefecture, Commercial, Admin } = require('../models');
const { getJWTBody } = require('../functions/auth/getJWTBody');

module.exports = {
  async getCommercials (request, response) {
    try {
      let getCommercials = await Commercial.findAll();

      response.status(200).json({ body: getCommercials });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async registerCommercial (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await Admin.findOne({ raw: true,
        where: { id: getId }
      });

      if (getUser == null || getUser == undefined ) {
        response.status(401).json({ error: 'Unauthorized' });

      } else {
        let verifyCommercial = await Commercial.findOne({ raw: true, 
          where: { name: request.body.name }});
  
        if (verifyCommercial == null || verifyCommercial == undefined) {
          await Commercial.create(request.body);
          response.status(201).json({ message: 'Commercial created' });

        } else {
        response.status(401).json({ error: 'Unauthorized' });
      };
    };

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    };
  },

  // async editActivity (request, response) {
  //   try {
  //     let getToken = request.headers['authorization'];
  //     let getId = await getJWTBody(getToken);
  //     let getUser = await Contributor.findOne({ raw: true, where: { id: getId, is_super_user: true } });

  //     if (getUser == null || getUser == undefined) {
  //       response.status(401).json({ error: 'Unauthorized' });

  //     } else {
  //       await EconomicActivity.update(request.body, {
  //         where: { id: request.body.id }
  //       });
  //     response.status(200).json({ message: 'Activity edited' });
  //   };

  //   } catch (error) {
  //     response.status(500).json({ error: error });
  //   };
  // },

  // async deleteActivity (request, response) {
  //   try {
  //     let getToken = request.headers['authorization'];
  //     let getId = await getJWTBody(getToken);
  //     let getUser = await Contributor.findOne({ raw: true, where: { id: getId, is_super_user: true } });

  //     if (getUser == null || getUser == undefined) {
  //       response.status(401).json({ error: 'Unauthorized' });

  //     } else {
  //       await EconomicActivity.destroy({
  //         where: {id: request.body.id}
  //       });
  //     response.status(200).json({ message: 'Activity deleted' });
  //   };

  //   } catch (error) {
  //     response.status(500).json({ error: error });
  //   };
  // },

};