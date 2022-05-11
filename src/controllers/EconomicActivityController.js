const { EconomicActivity, User } = require('../models');
const { getJWTBody } = require('../functions/auth/getJWTBody');

module.exports = {
  async getActivities (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({ raw: true, where: { id: getId, is_super_user: true } });

      if (getUser == null || getUser == undefined) {
        response.status(401).json({ error: 'Unauthorized' });

      } else {
        let getActivities = await EconomicActivity.findAll(request.body);

        response.status(200).json({ body: getActivities });
      };
      
    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async registerActivity (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({ raw: true, where: { id: getId, is_super_user: true } });

      if (getUser == null || getUser == undefined) {
        response.status(401).json({ error: 'Unauthorized' });

      } else {
        let verifyActivity = await EconomicActivity.findOne({
          where: { name: request.body.name }
        });
  
        if (verifyActivity == null || verifyActivity == undefined) {
          await EconomicActivity.create(request.body);
          response.status(201).json({ message: 'Activity created' });

        } else {
        response.status(401).json({ error: 'Unauthorized' });
      };
    };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editActivity (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({ raw: true, where: { id: getId, is_super_user: true } });

      if (getUser == null || getUser == undefined) {
        response.status(401).json({ error: 'Unauthorized' });

      } else {
        await EconomicActivity.update(request.body, {
          where: { id: request.body.id }
        });
      response.status(200).json({ message: 'Activity edited' });
    };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async deleteActivity (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({ raw: true, where: { id: getId, is_super_user: true } });

      if (getUser == null || getUser == undefined) {
        response.status(401).json({ error: 'Unauthorized' });

      } else {
        await EconomicActivity.destroy({
          where: {id: request.body.id}
        });
      response.status(200).json({ message: 'Activity deleted' });
    };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

};