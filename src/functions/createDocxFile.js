const fs = require("fs");
const { Document, Packer, Paragraph, TextRun } = require ("docx");
const { generateKey } = require("crypto");

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun("Hello World"),
                    new TextRun({
                        text: "Foo Bar",
                        bold: true,
                    }),
                    new TextRun({
                        text: "\tGithub is the best",
                        bold: true,
                    }),
                ],
            }),
        ],
    }],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Teste.docx", buffer);
});

module.exports = {
  async generateDocx (data) {
    try {

      

    } catch (error) {
      console.log(error);
    }
  }
}