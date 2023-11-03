// pdf to images
// const pdfPoppler = require('pdf-poppler');
const path = require('path');
const fs = require('fs');
var pdf2img = require('pdf-img-convert');

exports.pdfToImages = async (pdfFilePath, presentationId) => {
  // Define the input PDF file path
  // const pdfFilePath = 'input.pdf';

  // Define the output folder where images will be saved
  const outputFolder = path.join(
    __dirname,
    '../../presentationsDirectory',
    presentationId,
    'outputImages'
  );

  await fs.mkdirSync(outputFolder);

  await async function () {
    var pdfArray = await pdf2img.convert(pdfFilePath);
    for (var i = 0; i < pdfArray.length; i++) {
      fs.writeFile(
        `${outputFolder}/output` + i + '.png',
        pdfArray[i],
        function (error) {
          if (error) {
            console.error('Error: ' + error);
          }
        }
      );
    }
  };
};