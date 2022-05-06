const { Files, Prefecture } = require('../models');

module.exports = {
  async saveFileInDB (id, link) {
    try {
      let getPrefecture = await Prefecture.findOne({ where: { id: id } });

      if(getPrefecture != null || getPrefecture != undefined) {
        link = `https://s3.us-east-1.wasabisys.com/cefitem/${link}`;
        let file = await Files.create({ file: link, user_files: id });
        console.log(file);
        return true
      }

      return false;
    }
    catch (error) {
      console.log(error);
    }
  }
}
