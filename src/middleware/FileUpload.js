var path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const { getJWTBody } = require('../functions/auth/getJWTBody');
const { saveFileInDB } = require('../functions/saveFileInDB');

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

const storageTypes = {
  s3: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, async (err, hash) => {
        if (err){
          cb(err);
        }

        let getToken = req.headers['Authorization'];
        let getId = await getJWTBody(getToken);

        const fileName = `${hash.toString("hex")}-${file.originalname.replace(/ /g,'-')}`;

        await saveFileInDB(getId, fileName);

        cb(null, fileName);
      });
    },
  }),
};

module.exports = {
  saveFile (id) {
    const storage = storageTypes.s3
    return multer({ storage });
  }
}
