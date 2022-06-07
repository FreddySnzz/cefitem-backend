const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.ibge.gov.br/explica/codigos-dos-municipios.php';


async function getCodigos (request, response) {
  try {
  axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
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