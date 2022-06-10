let api = require("../config/api");

module.exports = {
  async getImage (UF) {
    let response = await api.get(`https://s3.us-east-1.wasabisys.com/cefitem/d308799e6c1065ea157bc1c5b2aab6a9-LOGO.jpg`, {responseType: 'arraybuffer'});

    if (response.status == 200) {
      return "data:" + response.headers["content-type"] + ";base64," + Buffer.from(response.data).toString('base64');
    }
  }
};
