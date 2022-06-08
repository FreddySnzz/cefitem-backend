let api = require("../config/api");

module.exports = {
  async getIdCounty (UF) {
    let response =  await api.get(`localidades/estados/${UF}/distritos`)
    return response.data;
  }
};
