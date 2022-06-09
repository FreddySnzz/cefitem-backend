const { ParameterizationTIAF, Prefecture, Admin, Documents, Contributor } = require('../models');
const { calculateLimitAndOffset, paginate } = require("paginate-info");
const { getIdCounty } = require('../services/labelGenerator');
const { generateTIAFDocx } = require('../functions/createTiafFile')

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

        let dataToGenerateDocument = await PrepareDataToTiafDocument(PrefectureData);

        await generateTIAFDocx(dataToGenerateDocument);


        // await Documents.create();

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


async function PrepareDataToTiafDocument(prefectureData) {
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
      secretariat: ''
    }


    cities.map( citiesCallback => {
      if(citiesCallback.municipio.nome == prefectureData.city) {
        // console.log(citiesCallback.municipio.microrregiao.mesorregiao.UF.nome)
        dataToDocument.documentId = `1.${citiesCallback.municipio.id}/${year}${month}${day}`;
        dataToDocument.prefecture = `Prefeitura de ${citiesCallback.nome} - ${prefectureData.uf}`;
        dataToDocument.uf = `Estado do ${citiesCallback.municipio.microrregiao.mesorregiao.UF.nome}`;
        dataToDocument.secretariat = prefectureData.treasury_secretariat_name
      }
    });

    return dataToDocument;

  } catch (error) {
    console.log(error);
  }
}
