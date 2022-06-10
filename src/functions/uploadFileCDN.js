const fs = require('fs');
const { Documents } = require('../models');

module.exports = {
  async uploadFile (fileName) {
    try {
      const AWS = require("aws-sdk");

      const credentials = new AWS.SharedIniFileCredentials({ profile: 'wasabi' });
      AWS.config.credentials = credentials;

      AWS.config.region = process.env.AWS_DEFAULT_REGION;

      const endpoint = new AWS.Endpoint('s3.us-east-1.wasabisys.com');

      const s3 = new AWS.S3 ({
        apiVersion: "2010-12-01",
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,      // should be:  process.env.AWS_ACCESS_ID
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "us-east-1",
        endpoint: endpoint
      });

      fs.readFile(`./files/docx/${fileName}.docx`, async (err, data) => {
        if (err) throw err;
        let link = await uploadToWasabi(fileName, s3, data);

        console.log(link);
      });





    } catch (error) {
      console.log(error);
    }
  }
}

async function uploadToWasabi (fileName, s3, data) {
  try {

    const object_upload_params = {
      Bucket: "cefitem",
      Key: `${fileName}.docx`,
      Body: JSON.stringify(data, null, 2)
    };

    s3.putObject(object_upload_params, async function (err, data) {
      if(err) {
        console.log(err, err.stack);
      } else {
        fs.unlinkSync(`./files/docx/${fileName}.docx`);
        console.log('Agora')
        return `https://s3.us-east-1.wasabisys.com/cefitem/${fileName}`;
      }
    });

    console.log(await P);

  } catch(error) {
    console.log(error)
  }
}
