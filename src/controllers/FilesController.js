const { Files, Prefecture } = require('../models');
const { getJWTBody } = require('../functions/auth/getJWTBody');

const AWS = require("aws-sdk");
const credentials = new AWS.SharedIniFileCredentials({ profile: 'wasabi' });

AWS.config.credentials = credentials
AWS.config.region = process.env.AWS_DEFAULT_REGION;

const endpoint = new AWS.Endpoint('s3.us-east-1.wasabisys.com');
const s3 = new AWS.S3 ({
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,      // should be:  process.env.AWS_ACCESS_ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
  endpoint: endpoint
});


module.exports = {
  async cancelUpload (request, response) {
    try {
      let getToken = request.headers['authorization'];
      let getId = await getJWTBody(getToken);
      let getPrefecture = await Prefecture.findOne({
        where: { id: getId }
      });

      const object_upload_params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: request.body.link.substring(43, request.body.link.length)
      };

      // upload object to previously created "examplebucket"
      s3.deleteObject(object_upload_params, async function (error, data) {
        if (error) {
          console.log(error, error.stack);  // an error occurred
        } else {
          await Files.destroy({
            where: { file: request.body.link }
          });
          console.log(data); // successful response
        };
      });

      response.status(200).json({ message: "File updated" })

    } catch (error) {
      response.status(500).json ({ error: error });
    };
  },

};
