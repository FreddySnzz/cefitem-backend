const fs = require("fs");
const { Document, Packer, Paragraph, WidthType, HeadingLevel, TextRun, AlignmentType, ImageRun, Table, TableRow, TableCell, Header } = require ("docx");
const { getImage } = require('../services/imageProcess');


const tableFatos1 = new Table({
  columnWidths: [9300],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1200,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: " 1. DOS FATOS",
              size: 24,
              bold: true,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "12-bold"
            }),
          ],
        })
      ],
    }),
  ],
});

const tableFatos2 = new Table({
  columnWidths: [9300],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1200,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: " 2. PENALIDADE E DISPOSITIVO LEGAL INFRINGIDO",
              size: 24,
              bold: true,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "12-bold"
            }),
          ],
        })
      ],
    }),
  ],
});

const tableFatos3 = new Table({
  columnWidths: [9300],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1200,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: " 3. DEMONSTRATIVO DO CÁLCULO DO VALOR APURADO",
              size: 24,
              bold: true,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "12-bold"
            }),
          ],
        })
      ],
    }),
  ],
});

const tableFatos4 = new Table({
  columnWidths: [9300],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1200,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: " 4. AUTUAÇÃO",
              size: 24,
              bold: true,
              color: "000000",
              alignment: AlignmentType.LEFT,
              style: "12-bold"
            }),
          ],
        })
      ],
    }),
  ],
});

const tableArtigo = new Table({
  columnWidths: [9300],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 1200,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph({
              text: "Art. 4º. A COSIP será cobrada mensalmente, por meio da conta de Energia Elétrica emitida pela concessionária, de acordo com os valores constantes da Tabela I, desta Lei.",
              size: 24,
              color: "000000",
              alignment: AlignmentType.JUSTIFIED,
              style: "principal-marcado"
            }),
          ],
        })
      ],
    }),
  ],
});

module.exports = {
  async generateNoticeOfInfractionDocument (data) {
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

      const tableContribuinte = new Table({
        columnWidths: [9300],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "CONTRIBUINTE MATRIZ",
                    size: 24,
                    bold: true,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold",
                    colorBackground: "111111"
                  }),
                ],
              })
            ],
          }),
        ],
      });

      const tableNome = new Table({
        columnWidths: [9300],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "NOME / NOME FANTASIA",
                    size: 24,
                    bold: true,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold"
                  }),
                  new Paragraph({
                    text: `${data.contributor.company_name}`,
                    size: 24,
                    bold: true,
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

      const tableMultiplaTitulo1 = new Table({
        columnWidths: [3500, 2500, 3300],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
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
                  size: 1200,
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
                  size: 1200,
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
        ],
        cantSplit: true,
      });

      const tableMultiplaTitulo2 = new Table({
        columnWidths: [5000, 1800, 2500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
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
                  size: 1200,
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
                  size: 1200,
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
        ],
        cantSplit: true,
      });

      const tableMultiplaTitulo3 = new Table({
        columnWidths: [2300, 3500, 2000, 1500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
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
                  size: 1200,
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
                  size: 1200,
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
                  size: 1200,
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
        cantSplit: true,
      });

      const tableCosips = new Table({
        columnWidths: [3150, 6150],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "DATA FATURAMENTO",
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "11-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "COSIP NÃO RECOLHIDA",
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "11-bold",
                    bold: true
                  }),
                ],
              }),
            ]
          })
        ],
      });

      const tableDatasCosips = new Table({
        columnWidths: [3150, 6150],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: `01/01/2022`,
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "11-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: `R$1.500,00`,
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.RIGHT,
                    style: "11-normal"
                  }),
                ],
              }),
            ]
          })
        ],
      });
      
      const tableCosipsTotal = new Table({
        columnWidths: [3150, 6150],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "TOTAL",
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "11-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: `R$1.500,00`,
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.RIGHT,
                    style: "11-bold",
                    bold: true
                  }),
                ],
              }),
            ]
          })
        ],
      });

      const tableAnexo1Titulo = new Table({
        columnWidths: [1800, 1500, 1500, 1500, 1500, 1500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 800,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "DATA FATURAMENTO",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "COSIP NÃO RECOLHIDA",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "COSIP CORRIGIDA",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "JUROS DE MORA",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "MULTA DE MORA",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "TOTAL CRÉDITO",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
            ]
          })
        ],
      });

      const tableAnexo1Dados = new Table({
        columnWidths: [1800, 1500, 1500, 1500, 1500, 1500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 800,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "01/01/2017",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$ 41.288,80",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$11.280,00",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$1.280,00",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$  -",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$59.288,80",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
            ]
          })
        ],
      });

      const tableAnexo2Titulo = new Table({
        columnWidths: [800, 1500, 1500, 1500, 1500, 1500, 1500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 800,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "DATA",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Lançamento",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Taxa valor",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Correção",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Juros de mora",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Multa de Mora",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Subtotal Lançamento",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
            ]
          })
        ],
      });

      const tableAnexo2Dados = new Table({
        columnWidths: [800, 1500, 1500, 1500, 1500, 1500, 1500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 800,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "2016",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "01/01/2017",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$11.280,00",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$15.280,00",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$5.280,00",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$  -",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 500,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "R$20.280,00",
                    size: 20,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "10-normal",
                    bold: true
                  }),
                ],
              }),
            ]
          })
        ],
      });

      const tableAnexo2Total = new Table({
        columnWidths: [8300, 1500],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: "Total Lançamento",
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "11-bold",
                    bold: true
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 1200,
                  type: WidthType.DXA,
                },
                children: [
                  new Paragraph({
                    text: `R$156.500,00`,
                    size: 22,
                    color: "000000",
                    alignment: AlignmentType.RIGHT,
                    style: "11-bold",
                    bold: true
                  }),
                ],
              }),
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
              id: "principal-marcado",
              name: "principal-marcado",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                size: 24,
                color: "000000",
                font: 'Times New Roman',
                highlight: "yellow"
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
              id: "11-normal",
              name: "11-normal",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                size: 22,
                color: "000000",
                font: 'Times New Roman'
              },
            },
            {
              id: "10-bold",
              name: "10-bold",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                bold: true,
                size: 20,
                color: "000000",
                font: 'Times New Roman'
              },
            },
            {
              id: "10-normal",
              name: "10-normal",
              basedOn: "Normal",
              next: "Normal",
              quickFormat: true,
              run: {
                size: 20,
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
            properties: {
              titlePage: true,
            },
            headers: {
              first: new Header({
                children: [
                  new TextRun({
                    text: "___________________________________________________________________________",
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "principal",
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                text: "TERMO DE NOTIFICAÇÃO DE LANÇAMENTO E AUTO DE INFRAÇÃO",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Nº `,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "12-bold",
                    bold: true,
                    size: 24
                  }),
                  new TextRun({
                    text: `1.2111201/2022`,
                    color: "000000",
                    alignment: AlignmentType.CENTER,
                    style: "principal",
                    size: 24
                  }),
                ],
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: "      Processo administrativo Nº ",
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "12-bold",
                    bold: true,
                    size: 24
                  }),
                  new TextRun({
                    text: `1.2111201/2022`,
                    color: "000000",
                    alignment: AlignmentType.LEFT,
                    style: "principal",
                    size: 24
                  }),
                ],
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),

              tableContribuinte,
              tableNome,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),

               tableMultiplaTitulo1,

               new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),

               tableMultiplaTitulo2,

               new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "12-bold"
              }),

               tableMultiplaTitulo3,

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
                    text: "          Em ",
                    bold: false,
                    alignment: AlignmentType.JUSTIFIED,
                    size: 24,
                    style: "principal"
                  }),
                  new TextRun({
                    text: "9 de junho de 2022",
                    bold: false,
                    highlight: "yellow",
                    alignment: AlignmentType.JUSTIFIED,
                    size: 24,
                    style: "principal"
                  }),
                  new TextRun({
                    text: ", no exercício das atribuições inerentes ao poder de polícia administrativa tributária da Secretaria Municipal de Planejamento de Campo Maior PI, NOTIFICA-SE vossa senhoria para tomar conhecimento a respeito do lançamento, referente Contribuição para o Custeio da Iluminação Pública - COSIP, referente ao exercício de ",
                    bold: false,
                    alignment: AlignmentType.JUSTIFIED,
                    size: 24,
                    style: "principal"
                  }),
                  new TextRun({
                    text: "2017",
                    bold: false,
                    highlight: "yellow",
                    alignment: AlignmentType.JUSTIFIED,
                    size: 24,
                    style: "principal"
                  }),
                  new TextRun({
                    text: ".",
                    bold: false,
                    alignment: AlignmentType.JUSTIFIED,
                    size: 24,
                    style: "principal"
                  }),
                ],
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
              }),

              tableFatos1,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "          Como se sabe, a cobrança da COSIP do contribuinte é realizada pela autuada mensalmente, diretamente nas faturas de energia elétrica, de acordo com os valores prescritos na Tabela I, da Lei nº 005/2003, cujo produto da arrecadação é posteriormente repassado ao município.",
                color: "000000",
                alignment: AlignmentType.LEFT,
                style: "principal"
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Lei",
                    color: "000000",
                    alignment: AlignmentType.RIGHT,
                    style: "principal-marcado",
                    highlight: "yellow",
                    size: 24
                  }),
                  new TextRun({
                    text: " nº ",
                    color: "000000",
                    style: "principal",
                    alignment: AlignmentType.RIGHT,
                    size: 24,
                  }),
                  new TextRun({
                    text: "005/2003",
                    color: "000000",
                    style: "principal-marcado",
                    alignment: AlignmentType.RIGHT,
                    size: 24,
                    highlight: "yellow"
                  }),
                ]
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
              }),

              tableArtigo,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "          Acontece, que o valor cobrado pertinente à COSIP não estava de acordo com a faixa de consumo de energia elétrica e os valores constantes da Tabela I (Anexo 01), da Lei supracitada.",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "          Vale salientar, que referente ao exercício de 2017, foram constatados 84.778 (oitenta e quatro mil, setecentos e setenta e oito) faturas aos quais o valor da COSIP foi cobrado pela concessionária em desacordo com a Tabela I, da Lei nº 005/2003, causando um prejuízo ao município no valor de R$ 498.673,02 (quatrocentos e noventa e oito mil, seiscentos e setenta e três reais e dois centavos), não corrigidos e atualizados monetariamente.",
                style: "principal",
                alignment: AlignmentType.JUSTIFIED,
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
              }),

              tableCosips,
              tableDatasCosips,
              tableCosipsTotal,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "          Segue em anexo planilha com a relação das Unidades Consumidoras (Anexo 02), referente ao exercício de 2017 aos quais o valor cobrado pertinente à COSIP não estava de acordo com a faixa de consumo de energia elétrica e os valores constantes da Tabela I.",
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
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),

              tableAnexo1Titulo,
              tableAnexo1Dados,
              
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "          683.498,03 (seiscentos e oitenta e três mil, quatrocentos e noventa e oito reais e três centavos),",
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
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),

              tableFatos2,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "          Por tudo que foi visto, foi verificado, através de procedimento fiscal apropriado, através do Termo de Início de Ação Fiscal nº 001.0102.1.2202208/2021, que a autuada, no exercício de 2017, lançou a cobrança  84.778 (oitenta e quatro mil, setecentos e setenta e oito) contribuintes da COSIP valores inferiores aos valores correspondentes a faixa de consumo de energia previsto prevista na Tabela I da Lei nº 005/2003, causando ao erário municipal um prejuízo de R$ 498.673,02 (quatrocentos e noventa e oito mil, seiscentos e setenta e três reais e dois centavos).",
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
                text: "          Como o fato constitui infração ao disposto no(s) Art. 4ª, da Lei nº 005/2003, o autuado incorre na penalidade consignada no(s) termo(s) do(a) Alínea a.4, do Inciso II, do Art. 479, ambos da Lei Municipal n° 371/2017.",
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

              tableFatos3,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "          Sendo assim, a fazenda municipal cuidou em realizar a atualização e a correção monetária dos valores da(s) Taxa(s), considerando todo(s) o(s) estabelecimento(s).",
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

              tableAnexo2Titulo,
              tableAnexo2Dados,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),

              tableAnexo2Total,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "          Como foi visto, o contribuinte deixou de recolher ao erário público municipal a quantia de R$ 59.227,20 (cinquenta e nove mil, duzentos e vinte e sete reais e vinte centavos), valor este que, corrigido e atualizado monetariamente em 14/04/2021, passando a expressar o crédito R$ 83.491,84 (oitenta e três mil, quatrocentos e noventa e um reais e oitenta e quatro centavos).",
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
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    bullet: {
                      level: 0
                    },
                    text: "Correção Monetária",
                    color: "000000",
                    alignment: AlignmentType.JUSTIFIED,
                    style: "12-bold",
                    size: 24,
                    bold: true,
                  }),
                  new TextRun({
                    text: " - Para a atualização monetária dos valores que deixaram de ser recolhidos ao erário municipal foi utilizado o Índice de Correção IPCA, nos termos da alínea c, do Inciso I, do Art.357 da Lei Complementar Municipal n° 001/2005.",
                    color: "000000",
                    alignment: AlignmentType.JUSTIFIED,
                    style: "principal",
                    size: 24,
                  }),
                ]
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    bullet: {
                      level: 0
                    },
                    text: "Juros de Mora",
                    color: "000000",
                    alignment: AlignmentType.JUSTIFIED,
                    style: "12-bold",
                    size: 24,
                    bold: true,
                  }),
                  new TextRun({
                    text: " - Para o Juros de Mora, foi aplicada a alíquota de 1% ao mês, nos termos da alínea b, do Inciso I, do Art.357 da Lei Complementar Municipal n° 001/2005.",
                    color: "000000",
                    alignment: AlignmentType.JUSTIFIED,
                    style: "principal",
                    size: 24,
                  }),
                ]
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    bullet: {
                      level: 0
                    },
                    text: "Multa de Mora",
                    color: "000000",
                    alignment: AlignmentType.JUSTIFIED,
                    style: "12-bold",
                    size: 24,
                    bold: true,
                  }),
                  new TextRun({
                    text: " - Para a multa de Mora, foi aplicada a alíquota de 0,33% (zero virgula trinta e três por cento) ao dia, limitado ao montante de 20% (vinte por cento), nos termos do Inciso I, do Art. 358 da Lei Complementar Municipal n° 001/2005.",
                    color: "000000",
                    alignment: AlignmentType.JUSTIFIED,
                    style: "principal",
                    size: 24,
                  }),
                ]
              }),
              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "          Ato contínuo, visando-se auferir o valor da multa punitiva, em decorrência da infração cometida pelo(a) contribuinte, foi aplicada a penalidade de 20% sobre o valor de R$ 83.491,84 (oitenta e três mil, quatrocentos e noventa e um reais e oitenta e quatro centavos), referente ao crédito corrigido e atualizado monetariamente, montando a infração a quantia de R$ 16.698,37 (dezesseis mil, seiscentos e noventa e oito reais e trinta e sente centavos), a título de multa punitiva.",
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
                text: "          Sendo assim, considerando os valores corrigidos e atualizados monetariamente, que deixaram de ser recolhidos ao erário municipal, bem como o valor da infração cometida, este termo de lançamento apurou um Crédito Tributário no valor de R$ 100.190,21 (cem mil, cento e noventa reais e vinte e um centavos), quanto ao(s) exercício(s) 2017.",
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

              tableFatos4,

              new Paragraph({
                text: "",
                color: "000000",
                alignment: AlignmentType.JUSTIFIED,
                style: "principal"
              }),
              new Paragraph({
                text: "          Desta forma, fica o(a) contribuinte acima identificado(a) notificado(a) acerca da lavratura deste Termo de Notificação de Lançamento, no valor R$ 100.190,21 (cem mil, cento e noventa reais e vinte e um centavos), cientificando-o que tem o prazo de 30 (trinta) dias, contados a partir da ciência deste instrumento, para pagar ou interpor recurso, apresentando impugnação escrita e apresentando as provas necessárias junto à Secretaria Municipal de Finanças do Município de Massaranduba - PB, por intermédio do INSTITUTO BRASIL FISCAL* – IBF pelo E-mail: contato@ibftech.com.br.",
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
                text: "",
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
                text: "_________________________________________________",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "Claudenice Ferreira do Nascimento",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "Agente Fiscal de Tributos",
                color: "000000",
                alignment: AlignmentType.CENTER,
                style: "principal"
              }),
              new Paragraph({
                text: "Matrícula: 52420",
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
            ],
        }],
      });

      // Used to export the file into a .docx file
      await Packer.toBuffer(doc).then((buffer) => {
        //fs.writeFileSync(`./files/docx/${data.documentId.replace('/', '-')}.docx`, buffer);
        fs.writeFileSync("AutoDeInfração.docx", buffer);
      });

      return data.documentId;

    } catch (error) {
      console.log(error);
    };
  },
};


