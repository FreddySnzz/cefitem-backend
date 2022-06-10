const fs = require("fs");
const { Document, Packer, Paragraph, WidthType, HeadingLevel, TextRun, AlignmentType, ImageRun, Table, TableRow, TableCell } = require ("docx");
const { getImage } = require('../services/imageProcess');





const table3 = new Table({
  columnWidths: [9000],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1000,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "I. O contribuinte que deixar de atender as solicitações, total ou parcialmente, se recusar a exibir à fiscalização livros e documentos fiscais, embaraçar ou procurar ilidir por qualquer meio, a apuração dos tributos, estará sujeito às cominações das penalidades cabíveis, nos termos das leis tributárias municipal e federal. ",
              size: 12,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "principal"
            }),
            new Paragraph({
              text: "II. Fica estipulado o prazo de 90 (noventa) dias para a conclusão deste procedimento fiscal.",
              size: 12,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "principal"
            }),
          ],
        })
      ],
    }),
  ],
});

const table5 = new Table({
  columnWidths: [3000, 3000, 3000],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1000,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "Preposto: ",
              size: 12,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "principal"
            })
          ]
        }),
        new TableCell({
          width: {
            size: 1000,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "CPF: ",
              size: 12,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "principal"
            }),
          ],
        }),
        new TableCell({
          width: {
            size: 1000,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "",
              size: 12,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "12-bold"
            }),
            new Paragraph({
              text: "",
              size: 12,
              color: "000000",
              alignment: AlignmentType.START,
              style: "principal"
            })
          ]
        })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1000,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "Cargo: ",
              size: 12,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "principal"
            })
          ]
        }),
        new TableCell({
          width: {
            size: 1000,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "Ciência ás __:__ Hs, de __/__/__",
              size: 24,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "bold-12"
            })
          ]
        }),
        new TableCell({
          width: {
            size: 1000,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "Assinatura",
              size: 12,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "principal"
            })
          ]
        })
      ]
    })
  ],
});

module.exports = {
  async generateTIAFDocx (data) {
    try {

      const image = new ImageRun({
        data: await getImage(),
        transformation: {
            width: 100,
            height: 100,
        },
        floating: {
          horizontalPosition: {
            offset: 1014400,
          },
          verticalPosition: {
            offset: 507200,
          },
        },
      });

      const table = new Table({
        columnWidths: [9000, 1000, 5505],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 9000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "COORRESPONSÁVEL",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                ],
              })
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 9000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "NOME / NOME FANTASIA",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor.company_name}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
            ],
          })
        ],
      });

      const table2 = new Table({
        columnWidths: [4000, 2000, 2500, 1500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "ATIVIDADE",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor.economic_activity}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "CNPJ",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor.cnpj}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "INSCRIÇÃO MUNICIPAL",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: "",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "ENDEREÇO",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor.address}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Nº",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor.address_number}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "COMPLEMENTO",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor?.complement}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
            ],
          }),

          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "BAIRRO",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor?.district}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "CIDADE",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor?.city}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "ESTADO",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor?.uf}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "CEP",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor?.cep}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
            ],
          }),
        ],
      });

      const table4 = new Table({
        columnWidths: [4000, 2000, 3000],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Agente de Fiscalização Tributária",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.fiscal}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Matrícula",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.matriculaFiscal}`,
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal"
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1000,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: "Assinatura",
                    size: 12,
                    color: "000000",
                    alignment: AlignmentType.START,
                    style: "principal"
                  })
                ]
              })
            ]
          })
        ],
      });

      const doc = new Document({
        styles: {
          paragraphStyles: [
            {
              id: "principal",
              name: "principal",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                size: 24,
                color: "000000",
                font: 'Times New Roman'
              },
            },
            {
              id: "12-bold",
              name: "12-bold",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                bold: true,
                size: 24,
                color: "000000",
                font: 'Times New Roman'
              },
            },
            {
              id: "11-bold",
              name: "11-bold",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                bold: true,
                size: 22,
                color: "000000",
                font: 'Times New Roman'
              },
            },
            {
              id: "Heading2",
              name: "Heading 2",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                size: 26,
                bold: true,
                color: "999999",
                font: 'Arial'
              },
              paragraph: {
                spacing: {
                  before: 240,
                  after: 120
                },
              },
            }
          ]
        },
        sections: [{
            properties: {},
            children: [
              new Paragraph({
                children: [image]
              }),
              new Paragraph({
                text: `${data.uf}`,
                size: 12,
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: `${data.prefecture}`,
                size: 12,
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: `${data.secretariat}`,
                size: 12,
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "___________________________________________________________________________",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "Tendo em vista a falta de êxito para a realização da ciência desta intimação no endereço do estabelecimento, bem como em decorrência da prevenção contra disseminação da COVID-19, faça-se a publicação deste termo o quadro de avisos no átrio da sede da Prefeitura Municipal.",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "11-bold"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),
              new Paragraph({
                text: `TERMO DE INÍCIO DE AÇÃO FISCAL Nº ${data.documentId}`,
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),
              new Paragraph({
                text: "Processo:  1.2111201/2022",
                color: "000000",
                alignment: AlignmentType.LEFT,
                style: "12-bold"
              }),
              table,
              table2,
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text: "   No exercício das atribuições inerentes ao poder de polícia administrativo tributária da Fazenda Pública Municipal, dá-se início à DILIGÊNCIA levada a efeito nos termos dos Artigos 195-197 do Código Tributário Nacional e dos 818 - 827 da Lei Complementar Municipal nº 002/2002,",
                    bold: false,
                    size: 24,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TextRun({
                    text: " INTIMA-SE",
                    style: "12-bold",
                    bold: true,
                    size: 24,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TextRun({
                    text: " vossa senhoria a respeito do início desta Ação Fiscal Tributária e para que apresente, no prazo de 30 (trinta) dias, a contar da data da ciência deste termo, as solicitações abaixo especificadas, pertinente ao período entre 01/01/2017 e 28/02/2022, para efeito de fiscalização e pagamento da",
                    style: "principal",
                    size: 24,
                    alignment: AlignmentType.JUSTIFIED,
                  }),
                  new TextRun({
                    text: " Contribuição para o Custeio do Serviço de Iluminação Pública CIP/COSIP.",
                    bold: true,
                    size: 24,
                    alignment: AlignmentType.JUSTIFIED,
                  })
                ],
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Desta forma, fica V. Sª. Intimado(a) a cumprir as seguintes exigências: ",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "1. Enviar relatório, em formato de planilha em arquivo CSV ou XLS, referentes a todos os pagamentos ocorridos, durante o período fiscalizado, no território deste município fiscalizador, contemplando as seguintes informações contidas nas faturas, pertinentes à prestação de serviço de fornecimento de energia elétrica, de todos as Unidade Consumidoras no município:",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.1 Código da Unidade Consumidora",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "   1.2 Número Nota fiscal",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "   1.3 Classe",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.4 Endereço da Unidade Consumidora",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.5 nº Unidade Consumidora ",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.6 Complemento do endereço da Unidade Consumidora ",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.7 Bairro da Unidade Consumidora ",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.8 Cidade da Unidade Consumidora",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.9 Nome Consumidor",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.10 CPF do Consumidor",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.11 Consumo KWh",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.12 Tipo de Ligação",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.13 Forma Leitura",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.14 Código de Leitura",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.15 Descrição de Leitura",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.16 Data Faturamento ",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.17 Data de Vencimento",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.18 Data de Pagamento",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.19 Valor Pago",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.20 Valor Total da Fatura",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.21 Valor do TUST",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.22 Valor do TUSD",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.23 Valor de taxas de serviços cobrados pela distribuidora",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.24 Valor Correção",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.25 Valor Juros de Mora",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.26 Valor Multa de Mora",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   1.27 Valor COSIP ",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "2. Enviar relatório, em formato de planilha em arquivo CSV ou XLS, com a indicação de todas as Unidades Consumidoras ativas e inativas, não se restringido ao período fiscalizado, contemplando no mínimo as seguintes informações:",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   2.1 Número do controle da unidade consumidora.",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "   2.2 Logradouro da unidade consumidora.",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "   2.3 Número do logradouro da unidade consumidora",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "   2.4 Bairro da unidade consumidora.",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "   2.5 Complemento do endereço da unidade consumidora.",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "   2.6 Data da ativação do controle da unidade consumidora.",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "Obs:",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              table3,
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "   E, para constar e surtir os efeitos legais, lavra-se o presente termo, em duas vias de igual forma e teor, assinado pela autoridade fiscal infra grafada, cuja ciência do sujeito passivo dar-se-á mediante o recebimento deste termo, fisicamente ou eletronicamente, ou por publicação no painel de comunicação da prefeitura, conforme legislação vigente.",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "São José de Ribamar MA, 02/03/2022.",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              table4,
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "Todos os documentos e informações solicitadas deverão ser entregues ao(à) 0, no endereço infra grafado ou enviado eletronicamente para o Centro de Fiscalização Tributária Eletrônica Municipal – CEFITEM, pelo E-mail: suporte@cefitem.net",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "Endereço do setor: ",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "Logradouro: Av. Gonçalves Dias, n° 305, centro.",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "Complemento: Galeria José de Alencar/ Piso II, São José de Ribamar - MA, CEP 65.110-000.",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              table5
            ],
        }],
      });

      // Used to export the file into a .docx file
      Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("principal.docx", buffer);
      });

    } catch (error) {
      console.log(error);
    };
  },
};


