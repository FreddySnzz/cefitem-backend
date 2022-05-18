const { Admin } = require('../models');
const { generateNewToken } = require('../functions/auth/GenerateToken');
const { sendEmail } = require("../functions/sendEmail");
const { getJWTBody } = require('../functions/auth/getJWT');
const bcrypt = require("bcryptjs");

module.exports = {
  async createAdmin(request, response) {
    try {

      let adminSession = await getJWTBody(request);
      let verifySuperAdmin = await Admin.findOne({ where: { id: adminSession } });

      if(verifySuperAdmin.is_super_admin) {
        let verifyAdmin = await Admin.findOne({ where: { email: request.body.email } });

        if(verifyAdmin == undefined || verifyAdmin == null) {
          const salt = await bcrypt.genSalt(10);
          let phraseEncrypted = await bcrypt.hashSync(request.body.phrase, salt);

          request.body.token = await generateNewToken(0, 9);
          request.body.enabled = 0;
          request.body.is_super_admin = 0;
          request.body.phrase = phraseEncrypted;

          let createdAdmin = await Admin.create(request.body);

          await sendEmail({
            subject: 'Confirmação de cadastro',
            email: request.body.email,
            link: 'confimationLink',
            label: 'Confirmar conta',
            token: request.body.token,
            title: "Bem vindo (a) ao Cefitem! Confirme seu cadastro para poder aproveitar de todas as funcionalidades da plataforma.",
            subtitle: "Digite o token ao logar ou click no botão abaixo."
          });

          return response.status(201).json({ body: 'Admin is created' });
        }
      }

      response.status(401).json({ body: 'This user not super admin'});

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    }
  },

  async getAdmin(request, response) {
    try {

      let adminSession = await getJWTBody(request);
      let verifyAdmin = await Admin.findOne({ where: { id: adminSession }, attributes:
        {
          exclude: ['id', 'phrase','token','createdAt', 'updatedAt']
        }
      });

      return response.status(200).json({ body: verifyAdmin });

    } catch (error) {

    }
  }
}
