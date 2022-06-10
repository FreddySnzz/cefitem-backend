const { ParameterizationTIAF, Prefecture, Admin, Documents, Contributor } = require('../models');
const { calculateLimitAndOffset, paginate } = require("paginate-info");
const { getIdCounty } = require('../services/labelGenerator');
const { generateTIAFDocx } = require('../functions/createTiafFile');
const { getJWTBody } = require('../functions/auth/getJWT');

const { uploadFile } = require('../functions/uploadFileCDN');

module.exports = {
  async registerTIAF ( request, response ) {
    try {
      let getPrefecture = request.body.prefecture_id;
      let verifyPrefecture = await Prefecture.findByPk(getPrefecture);

      if ( verifyPrefecture == null || verifyPrefecture == undefined ) {

        response.status(400).json({ error: "Prefecture not found" });

      } else {
        let verifyTIAF = await ParameterizationTIAF.findOne({
          raw: true,
          where: { prefecture_id: getPrefecture }
        })

        if (verifyTIAF == null || verifyTIAF == undefined) {
          request.body.issued = false;
          request.body.sent = false;

          await ParameterizationTIAF.create(request.body);
          response.status(200).json({ message: "Parameterization TIAF Created" });

        } else {
          response.status(401).json({ error: "This Prefecture already registed in Parameterization TIAF" });

        };
      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async editTIAF ( request, response ) {
    try {
      let getPrefecture = request.body.prefecture_id;
      let verifyPrefecture = await Prefecture.findByPk(getPrefecture);

      if ( verifyPrefecture == null || verifyPrefecture == undefined ) {

        response.status(400).json({ error: "Prefecture not found" });

      } else {

        await ParameterizationTIAF.update(request.body, {
          where: { id: request.body.id }
        });

        response.status(200).json({ message: "Parameterization TIAF Edited" });

      };

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async getTIAF ( request, response ) {
    try {
      let prefectureId  = request.params.id;
      let getTIAF = await ParameterizationTIAF.findOne({
        raw: true,
        where: { prefecture_id: prefectureId },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

      response.status(200).json({ body: getTIAF });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async paginationTiaf ( request, response ) {
    try {
      const { query: { currentPage, pageSize } } = request;
      const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);

      const { rows, count } = await Prefecture.findAndCountAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
        attributes: {
          exclude: []
        },
        limit,
        offset,
      });

      const meta = paginate( currentPage, count, rows, pageSize );
      response.json({
        rows,
        meta,
        status: "200",
        message: "Parametrization TIAF geted",
      });

    } catch (error) {
      response.status(500).json({ error: error });
    };
  },

  async generateTiafDocument ( request, response ) {
    try {

      let getParameterizationTiaf = await ParameterizationTIAF.findOne({
        raw: true,
        where: {
          id: request.body.id
        }
      });


      if (getParameterizationTiaf == null || getParameterizationTiaf == undefined) {

        response.status(401).json({ error: "Parameterization TIAF not found" });

      } else {

        const PrefectureData = await Prefecture.findOne({ raw: true, where: { id: getParameterizationTiaf.prefecture_id }});

        let dataToGenerateDocument = await PrepareDataToTiafDocument(PrefectureData, getParameterizationTiaf.contributor_id);
        let documentId = await generateTIAFDocx(dataToGenerateDocument);
        let documentLink = await uploadFile(documentId.replace('/' , '-'));
        let adminId = await getJWTBody(request);

        console.log({
          label: documentId,
          link: documentLink,
          signed_document: '',
          prefecture_id: PrefectureData.id,
          admin_id: adminId,
          parameterization_tiaf_id: getParameterizationTiaf.id
        });
        // await Documents.create({
        //   label: documentId,
        //   link: documentLink,
        //   signed_document: '',
        //   prefecture_id: PrefectureData.id,
        //   admin_id: adminId,
        //   parameterization_tiaf_id: getParameterizationTiaf.id
        // });

        response.status(201).json({ message: "Document generated! Verify your email" });

      };

      // console.log(getParameterizationTiaf);

    } catch (error) {
      console.log(error)
      response.status(500).json({ error: error });
    };
  },

  // async getTiafDocument (request, response) {
  //   try {

  //     // let getTiaf = await Documents.findOne({
  //     //   raw: true,
  //     //   where: {
  //     //     label: "Termo de início de ação fiscal - TIAF"
  //     //   }
  //     // });

  //     let prefectureId  = request.params.id;
  //     let getTIAF = await ParameterizationTIAF.findOne({
  //       raw: true,
  //       where: { prefecture_id: prefectureId },
  //       attributes: {
  //         exclude: ['createdAt', 'updatedAt']
  //       }
  //     });

  //     let getCounty = await Prefecture.findOne({
  //       raw: true,
  //       where: {
  //         id: prefectureId
  //       },
  //       attributes: {
  //         exclude: ['createdAt', 'updatedAt']
  //       }
  //     });

  //     // if (getTiaf == null || getTiaf == undefined) {
  //     //   response.status(401).json({ error: "Not exist documents with this label" });
  //     // } else {
  //     //   response.status(200).json({ body: getTiaf });
  //     // };

  //     console.log(getCounty)

  //   } catch (error) {
  //     console.log(error)
  //     response.status(500).json({ error: error });
  //   };
  // },
};


async function PrepareDataToTiafDocument(prefectureData, contributor) {
  try {
    var date = new Date();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    let cities = await getIdCounty(prefectureData.uf);
    let dataToDocument = {
      documentId: '',
      uf: '',
      prefecture: '',
      contributor: '',
      secretariat: '',
      fiscal: '',
      matriculaFiscal: '',
      brasao: ''
    }


    cities.map(citiesCallback => {
      if(citiesCallback.municipio.nome == prefectureData.city) {
        // console.log(citiesCallback.municipio.microrregiao.mesorregiao.UF.nome)
        dataToDocument.documentId = `1.${citiesCallback.municipio.id}/${year}${month}${day}`;
        dataToDocument.prefecture = `Prefeitura de ${citiesCallback.nome} - ${prefectureData.uf}`;
        dataToDocument.uf = `Estado do ${citiesCallback.municipio.microrregiao.mesorregiao.UF.nome}`;
        dataToDocument.secretariat = prefectureData.treasury_secretariat_name;
        dataToDocument.fiscal = prefectureData.taxman_name;
        dataToDocument.matriculaFiscal = prefectureData.taxman_registration;
      }
    });

    let getContributorWithId = await Contributor.findOne({
      raw: true,
      where: { id: contributor },
      attributes: { exclude: ['createdAt', 'updatedAt', 'phrase', 'token', 'enabled'] }
    });
    dataToDocument.contributor = getContributorWithId

    return dataToDocument;

  } catch (error) {
    console.log(error);
  }
}
