const axios = require('axios');
const url = 'https://www.ibge.gov.br/explica/codigos-dos-municipios.php';


async function getCodigos (request, response) {
  try {
  axios(url).then(response => {
    const html = response.data;
    const tabelaCodigo = $('.container-codigos');
    const tabela = [];
  });

  tabelaCodigo.each(function() {
    const nomeUf = $(this).find('.container-uf').text();
    const codigos = $(this).find('.codigos-list').text();
  })



  } catch (error) {
    console.log(error);
  };
};
