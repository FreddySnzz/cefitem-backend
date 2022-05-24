const { getJWTBody } = require('../functions/auth/getJWTBody');
const { Contributor } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async getContributor (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getContributor = await Contributor.findOne({ 
        where: { id: getId },
        attributes:
          { exclude: 
            ['id', 'phrase', 'token', 'terms_confirmed',
             'is_super_user', 'createdAt', 'updatedAt'
            ]
          }
      });

      if (getContributor == null) {

        response.status(403).json({ error: 'Method not allowed'});

      } else {
        response.status(200).json({ body: getContributor });
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async changePassword (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getContributor = await Contributor.findOne({ 
        raw: true, 
        where: { id: getId } 
      });

      if (getContributor != null) {
        let phraseCompare = bcrypt.compareSync( request.body.old_password, getContributor.phrase );

        if (phraseCompare) {
          const salt = await bcrypt.genSalt(10);
          let newPhraseEncrypted = await bcrypt.hashSync( request.body.new_password, salt );

          let data = { phrase: newPhraseEncrypted };

          await Contributor.update( data, { where: { id: getId } });

          response.status(200).json({ message: 'Password changed' });
        };

      } else {
        response.status(401).json({ message: 'Not authorized' })
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async updateContributor (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getContributor = await Contributor.findOne({ 
        raw: true, 
        where: { id: getId } 
      });

      await Contributor.update(request.body, {
        where: { id: getContributor.id }
      });

      response.status(200).json({ message: 'Contributor updated' });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async deleteContributor (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getContributor = await Contributor.findOne({ 
        where: { id: getId } 
      });

      if (getContributor == null || getContributor == undefined) {

        response.status(404).json({ message: "Contributor not found" });

      } else {

        await getContributor.destroy();
        response.status(200).json({ message: "Contributor deleted" });
        
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },
}
