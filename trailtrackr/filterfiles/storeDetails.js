const fs = require('fs');
const pdf = require('pdf-parse');

const extractPdfData = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    
    console.log('Text Content:');
    console.log(data.text);

    console.log('PDF Metadata:');
    console.log(data.info);

    console.log('Number of Pages:', data.numpages);
    console.log('Number of Rendered Pages:', data.numrender);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

// Replace with the path to your PDF file
extractPdfData('Garland-Ventures-Store-List.pdf');
