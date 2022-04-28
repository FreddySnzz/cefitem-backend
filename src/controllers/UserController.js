const { getJWTBody } = require('../functions/auth/getJWTBody');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async getUser (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({ where: { id: getId },
        attributes:
          {
            exclude: ['id', 'phrase',
              'token', 'terms_confirmed', 'is_super_user',
              'createdAt', 'updatedAt']
          }
      });

      if (getUser == null) {
        response.status(403).json({ error: 'Method not allowed'});

      } else {
        response.status(200).json({ body: getUser });
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async changePassword (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({ raw: true, where: { id: getId } });

      if (getUser != null) {
        let phraseCompare = bcrypt.compareSync(request.body.old_password, getUser.phrase);

        if (phraseCompare) {
          const salt = await bcrypt.genSalt(10);
          let newPhraseEncrypted = await bcrypt.hashSync(request.body.new_password, salt);

          let data = { phrase: newPhraseEncrypted };

          await User.update( data, { where: { id: getId } });

          response.status(200).json({ message: 'Password changed' });
        }

      } else {
        response.status(401).json({ message: 'Not authorized' })
        };

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    };
  },

  async updateUser (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({ raw: true, where: { id: getId } });

      console.log(request.body)

      await User.update({ where: { id: getUser }});

      response.status(200).json({ message: 'User updated' });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async deleteUser (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getUser = await User.findOne({where: { id: getId }
      });

      if (getUser == null || getUser == undefined) {
        response.status(404).json({ message: "User not found" });
      } else {
        await getUser.destroy();
        response.status(200).json({ message: "User deleted" });
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },
}
