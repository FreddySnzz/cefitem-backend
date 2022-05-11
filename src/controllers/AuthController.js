const { Contributor } = require('../models');
const bcrypt = require("bcryptjs");

const { generateNewToken } = require('../functions/auth/GenerateToken');
const { generateJWT } = require('../functions/auth/GenerateJWT');
const { sendEmail } = require("../functions/sendEmail");

module.exports = {
  async createContributor (request, response) {
    try {
      let verifyUser = await Contributor.findOne({
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

        await Contributor.create(request.body);

        await sendEmail({
          subject: 'Confirmação de cadastro',
          email: request.body.email,
          link: 'confimationLink',
          label: 'Confirmar conta',
          token: request.body.token,
          title: "Bem vindo (a) ao Cefitem! Confirme seu cadastro para poder aproveitar de todas as funcionalidades da plataforma.",
          subtitle: "Digite o token recebido ou click no botão abaixo."
        });

        response.status(201).json({ body: 'Contributor created' })
      } else {
        response.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    }
  },

  async authContributor (request, response) {
    try {
      const verifyUserByEmail = await Contributor.findOne({ where: { email: request.body.email } });

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
        response.status(401).json({ message: 'Contributor disabled' });
      }
      else {
        response.status(401).json({ message: 'Fail'});
      }

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    }
  },

  async enableContributor (request, response) {
    try {
      let verifyUserByEmail = await Contributor.findOne( { where: { email: request.body.email } });

      if(verifyUserByEmail == null || verifyUserByEmail == undefined) {
        response.status(412).json({ 'message': 'Contributor not found' });
      }
      else {
        if(verifyUserByEmail.token == request.body.token) {
          if(verifyUserByEmail.enabled == false) {
            let data = { enabled: true }

            await User.update( data, { where: { email: request.body.email } });
            response.status(200).json({ "body": "Contributor enabled" });
          }
          else {
            response.status(412).json({ message: "Contributor has enabled" });
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

  async recoveryPhrase (request, response) {
    try {

      let verifyUserBySecureToken = await Contributor.findOne({ where: { token: request.body.token } });

      if(verifyUserBySecureToken == null || verifyUserBySecureToken == undefined) {
        response.status(404).json({ message: "Contributor not found" });
      } else {

        let phraseCompare = bcrypt.compareSync(request.body.new_phrase, verifyUserBySecureToken.phrase);

        if(phraseCompare) {
          response.status(401).json({ message: "The new password must never have been used" });
        }
        else {
          const salt = await bcrypt.genSalt(10);
          let newPhrase = await bcrypt.hashSync(request.body.new_phrase, salt);

          await User.update(
            { phrase: newPhrase },
            { where: { token: request.body.token }
          });

          response.status(200).json({ body: "Password changed" });
        }
      }
    } catch (error) {
      response.status(500).json({ error: error });
    }
  },

  async sendTokenRecovery (request, response) {
    try {
      let verifyUserByEmail = await Contributor.findOne( { where: { email: request.body.email } });

      if(verifyUserByEmail == null || verifyUserByEmail == undefined) {
        response.status(412).json({ 'message': 'Contributor not found' });
      } else {
        const { generateNewToken } = require('../functions/auth/GenerateToken');
        let newToken = await generateNewToken(0, 9);

        let token = await User.findOne({
          where: { token: newToken }
        });

        if (token == null || token == undefined) {
          await Contributor.update(newToken, {
            where: { email: request.body.email }
          });

          await sendEmail({
            subject: 'Recuperação de senha',
            email: request.body.email,
            link: 'recoveryLink',
            label: 'Recuperar senha',
            token: newToken,
            title: "A sua senha logo logo será recuperada!",
            subtitle: "Digite o token recebido e sua nova senha ou click no botão abaixo."
          });

          response.status(200).json({ message: 'Verify your email' });
        }
      };

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    }
  }
}
