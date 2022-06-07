let api = require("../config/api");

module.exports = {
  async getIdCounty (data) {
    return await api.get(`localidades/estados/${UF}/distritos`, data);
  },
  // async getRiskAnalisysService (data) {
  //   console.log(data)
  //   return await api.post("/process/risk", data);
  // },
  // async getDocumentTextService (data) {
  //   return await api.post("/process/getTextFromDocs", data);
  // }
};