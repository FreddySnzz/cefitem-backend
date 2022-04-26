const { getJWTBody } = require('../functions/auth/getJWTBody');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async getUser (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let userCompare = await User.findOne({ where: { id: getId },
        attributes: 
          {
            exclude: ['id', 'phrase', 
              'token', 'terms_confirmed', 'is_super_user',
              'createdAt', 'updatedAt']
          }
      });

      if (userCompare == null) {
        response.status(403).json({ error: 'Method not allowed'});
        
      } else {
        response.status(200).json({ body: userCompare });
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    };
  },

  // async changePhrase (request, response) {
  //   try {
  //   let getToken = request.headers['authorization'];
  //   let getId = await getJWTBody(getToken);
  //   let user = await User.findOne({ where: {id: getId}});

  //   if (user != null) {
  //     let phraseCompare = bcrypt.compareSync(request.body.oldPhrase, user.phrase);
      
  //     if (phraseCompare) {
  //       const salt = await bcrypt.genSalt(10);
  //       let newPhraseEncrypted = await bcrypt.hashSync(request.body.newPhrase, salt);

  //       request.body.phrase = newPhraseEncrypted;
  //       await User.update(
  //         request.body, {
  //           where: {id: getId}
  //       })

  //       response.status(200).json({ message: 'Password changed' });

  //     }
  //   } else {
  //     response.status(401).json({ message: 'Not authorized' })
  //     }
  //   } catch (error) {
  //     response.status(500).json({ error: error });
  //   };
  // },

  // async changeNickname (request, response) {
  //   try {
  //   let getToken = request.headers['authorization'];
  //   let getId = await getJWTBody(getToken);
  //   let user = await User.findOne({ where: {id: getId }});

  //   request.body.nickname = request.body.newNick.toLowerCase();
  //   await User.update(
  //     request.body, {
  //       where: {id: getId}
  //     });

  //   response.status(200).json({ message: 'Nickname changed' });

  //   } catch (error) {
  //     response.status(500).json({ error: error });
  //   };
  // }
}