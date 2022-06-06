const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require ("docx");

module.exports = {
  async generateDocx (data) {
    try {
      const doc = new Document({
          sections: [{
              properties: {},
              children: [
                  new Paragraph({
                      children: [
                        new Paragraph({
                          text: "Estado do Maranhão",
                          size: 14,
                          color: "000000",
                        new Paragraph({
                            text: "\nPrefeitura de São José de Ribamar MA",
                            size: 14,
                            color: "000000",
                        })
                      ],
                  }),
              ],
          }],
      });

      // Used to export the file into a .docx file
      Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Teste.docx", buffer);
      });

    } catch (error) {
      console.log(error);
    };
  },
};