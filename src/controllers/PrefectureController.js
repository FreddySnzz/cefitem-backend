const { Prefecture, Commercial, COSIF, COSIP, ERB, Hired, OwnISS, SubstituteISS } = require('../models');
const { generateJWT } = require('../functions/auth/GenerateJWT');
const { getJWTBody } = require('../functions/auth/getJWTBody');
const { calculateLimitAndOffset, paginate } = require("paginate-info");
const { sendEmailAdm } = require('../functions/sendEmailAdm')
const bcrypt = require("bcryptjs");

module.exports = {
  async registerPrefecture (request, response) {
    try {
      let verifyPrefectureByName = await Prefecture.findOne({
        raw: true,
        where: { name: request.body.name }
      });

      let verifyPrefectureByCity = await Prefecture.findOne({
        raw: true,
        where: { city: request.body.city }
      });

      if (verifyPrefectureByName == null || verifyPrefectureByName == undefined) {
        if (verifyPrefectureByCity == null || verifyPrefectureByCity == undefined) {

          const salt = await bcrypt.genSalt(10);
          let phraseEncrypted = await bcrypt.hashSync( request.body.phrase, salt );

          let commercialId = await Commercial.create({ status: false });
          let cosifId = await COSIF.create({ status: false });
          let cosipId = await COSIP.create({ status: false });
          let ERBId = await ERB.create({ status: false });
          let hiredId = await Hired.create({ status: false });
          let ownIssId = await OwnISS.create({ status: false });
          let substituteIssId = await SubstituteISS.create({ status: false });

          request.body.commercial_id = commercialId.id;
          request.body.cosif_id = cosifId.id;
          request.body.cosip_id = cosipId.id;
          request.body.erb_id = ERBId.id;
          request.body.hired_id = hiredId.id;
          request.body.own_iss_id = ownIssId.id;
          request.body.substitute_iss_id = substituteIssId.id;
          request.body.phrase = phraseEncrypted;

        let prefectureRegisted = await Prefecture.create(request.body);
        let jwtToken = await generateJWT({ id: prefectureRegisted.id });

        if(process.env.ENVIRONMENT == 'production') {
          await sendEmailAdm({
            subject: 'Cadastro de nova prefeitura',
            email: 'w@wlissesmenezes.adv.br',
            label: 'Cadastro de prefeitura',
            title: "Confirmação de cadastro de nova prefeitura",
            subtitle: `Nome: ${request.body.name}\nEmail: ${request.body.email}`
          });
        }

        response.status(201).json({ message: 'Prefecture registed', id: jwtToken });

        } else {
          response.status(401).json({ error: 'Unauthorized' });
        };

      } else {
        let jwtToken = await generateJWT({ id: verifyPrefectureByName.id });

        response.status(401).json({ message: "A prefecture has already been created with this city", id: jwtToken });
      };

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    };
  },

  async getPrefecture (request, response) {
    try {
      const { query: { currentPage, pageSize } } = request;
      const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);
      //const getPrefectures = await Prefecture.findAll()

      const { rows, count } = await Prefecture.findAndCountAll({
        include: [
          { model: Commercial, as: "commercial_prefecture", attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
          { model: COSIF, as: "cosif_prefecture", attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
          { model: COSIP, as: "cosip_prefecture", attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
          { model: ERB, as: "erb_prefecture", attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
          { model: Hired, as: "hired_prefecture", attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
          { model: OwnISS, as: "own_iss_prefecture", attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
          { model: SubstituteISS, as: "substitute_iss_prefecture", attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } },
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
        attributes: {
          exclude: ['commecial_id', 'cosif_id', 'cosip_id', 'erb_id', 'hired_id', 'own_iss_id', 'substitute_iss_id', 'createdAt', 'updatedAt']
        },
        limit,
        offset,
      });

      const meta = paginate( currentPage, count, rows, pageSize );
      response.json({
        rows,
        meta,
        status: "200",
        message: "Prefecture geted",
      });

    } catch (error) {
      console.log(error);
      response.status(500).json({ error: error });
    };
  },

  async editPrefecture (request, response) {
    try {
      let queryId = request.query.id;
      let getPrefecture = await Prefecture.findOne({raw: true,
        where: {id: queryId}
      });

      if (queryId == null || queryId == undefined) {
        response.status(401).json({ error: "Unauthorized" });

      } else {
        await Prefecture.update(request.body, {
          where: { name: getPrefecture.name }
        });

        response.status(200).json({ message: 'Prefecture edited' });

      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async deletePrefecture (request, response) {
    try {
      let queryId = request.query.id;

      if (queryId == null || queryId == undefined) {
        response.status(401).json({ error: "Unauthorized" });

      } else {
        let getPrefecture = await Prefecture.findOne({
          raw: true,
          where: {id: queryId}
        });

        if ( getPrefecture == null || getPrefecture == undefined ) {

          return response.status(400).json({ message: "This prefecture not exist" });

        } else {

          await Prefecture.destroy(getPrefecture, {
            where: { id: getPrefecture.id }
          });

          response.status(200).json({ message: 'Prefecture deleted' });

        };
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async uploadFiles (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);

      let verifyPrefecture = await Prefecture.findOne({
        where: { id: getId }
      });

      if (verifyPrefecture == null || verifyPrefecture == undefined) {
        response.status(401).json({ message: 'Prefecture not fount' });
      }

      response.status(200).json({ message: verifyPrefecture });

    }
    catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async recoveryPhrase (request, response) {
    try {
      let verifyPrefectureBySecureToken = await Prefecture.findOne({ where: { token: request.body.token } });

      if(verifyPrefectureBySecureToken == null || verifyPrefectureBySecureToken == undefined) {

        response.status(404).json({ message: "Prefecture not found" });

      } else {
        let phraseCompare = bcrypt.compareSync(request.body.new_phrase, verifyPrefectureBySecureToken.phrase);

        if (phraseCompare) {

          response.status(401).json({ message: "The new password must never have been used" });

        } else {
          const salt = await bcrypt.genSalt(10);
          let newPhrase = await bcrypt.hashSync( request.body.new_phrase, salt );

          await Prefecture.update(
            { phrase: newPhrase },
            { where: { token: request.body.token }
          });

          response.status(200).json({ body: "Password changed" });

        };
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },
};
