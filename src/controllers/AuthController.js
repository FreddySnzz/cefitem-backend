const { User } = require('../models');
const bcrypt = require("bcryptjs");
var crypto = require('crypto');

const { generateNewToken } = require('../functions/auth/GenerateToken');
const { generateJWT } = require('../functions/auth/GenerateJWT');

module.exports = {
  async createUser (request, response) {
    try {
      let verifyUser = await User.findOne({
        where: { name: request.body.name }
      })

      if(verifyUser == null || verifyUser == undefined) {
        const salt = await bcrypt.genSalt(10);
        let phraseEncrypted = await bcrypt.hashSync(request.body.phrase, salt);

        request.body.name = request.body.name.toLowerCase();
        request.body.phrase = phraseEncrypted;
        request.body.token = await generateNewToken(0, 9);
        request.body.enabled = false;
        request.body.is_super_user = false;
        request.body.terms_confirmed = true;

        await User.create(request.body);
        response.status(201).json({ body: 'User created' })
      } else {
        response.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      response.status(500).json({ error: error });
    }
  },

  async authUser (request, response) {
    try {
      const verifyUserByEmail = await User.findOne({ where: { email: request.body.email } });

      if(verifyUserByEmail == null || verifyUserByEmail == undefined){
        response.status(401).json({ message: 'Unauthorized'});
      }

      let phraseCompare = bcrypt.compareSync(request.body.phrase, verifyUserByEmail.phrase);

      if(phraseCompare) {
        if(verifyUserByEmail.enabled) {
          let jwtToken = await generateJWT({ id: verifyUserByEmail.id });
          return response.status(200).json({
            "body":{
              "x-access-token": jwtToken,
              "email": verifyUserByEmail.email
            }
          });
        }
        response.status(401).json({ message: 'User disabled' });
      }
      else {
        response.status(401).json({ message: 'Fail'});
      }

    } catch (error) {
      response.status(500).json({ error: error });
    }
  },

  async getToken (request, response) {
    try {
      const verifyUserByEmail = await User.findOne( { where: { email: request.body.email } });

      if(verifyUserByEmail == null || verifyUserByEmail == undefined) {
        response.status(412).json({ 'message': 'User not found' });
      }
      else {
        const getToken = verifyUserByEmail.token;
        response.status(200).json({ body: getToken });
      }

    } catch (error) {
      console.log(error);
      response.status(500).json({ error: error });
    }
  },

  async enableUser (request, response) {
    try {
      let verifyUserByEmail = await User.findOne( { where: { email: request.body.email } });

      if(verifyUserByEmail == null || verifyUserByEmail == undefined) {
        response.status(412).json({ 'message': 'User not found' });
      }
      else {
        if(verifyUserByEmail.token == request.body.token) {
          if(verifyUserByEmail.enabled == false) {
            let data = { enabled: true }

            await User.update( data, { where: { email: request.body.email } });
            response.status(200).json({ "body": "User enabled" });
          }
          else {
            response.status(412).json({ message: "User has enabled" });
          }
        }
        else {
          response.status(401).json({ message: "Token not corret" });
        }
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: error });
    }
  },

  // async recoveryPhrase (request, response) {
  //   try {

  //     let verifyUserBySecureToken = await User.findOne({ where: { secure_token: request.body.token } });

  //     if(verifyUserBySecureToken == null || verifyUserBySecureToken == undefined) {
  //       response.status(404).json({ message: "User not found" });
  //     } else {

  //       let phraseCompare = bcrypt.compareSync(request.body.new_phrase, verifyUserBySecureToken.phrase);

  //       if(phraseCompare) {
  //         response.status(401).json({ message: "The new password must never have been used" });
  //       }
  //       else {
  //         const salt = await bcrypt.genSalt(10);
  //         let newPhrase = await bcrypt.hashSync(request.body.new_phrase, salt);

  //         await User.update(
  //           { phrase: newPhrase },
  //           { where: { secure_token: request.body.token }
  //         });

  //         response.status(200).json({ body: "Password changed" });
  //       }
  //     }
  //   } catch (error) {
  //     response.status(500).json({ message: error });
  //   }
  // }
}
