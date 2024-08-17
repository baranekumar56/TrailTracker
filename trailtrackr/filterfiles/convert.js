// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const XLSX = require('xlsx');

// const stateCodes = {
//   'AL': 'Alabama',
//   'AK': 'Alaska',
//   'AZ': 'Arizona',
//   'AR': 'Arkansas',
//   'CA': 'California',
//   'CO': 'Colorado',
//   'CT': 'Connecticut',
//   'DE': 'Delaware',
//   'FL': 'Florida',
//   'GA': 'Georgia',
//   'HI': 'Hawaii',
//   'ID': 'Idaho',
//   'IL': 'Illinois',
//   'IN': 'Indiana',
//   'IA': 'Iowa',
//   'KS': 'Kansas',
//   'KY': 'Kentucky',
//   'LA': 'Louisiana',
//   'ME': 'Maine',
//   'MD': 'Maryland',
//   'MA': 'Massachusetts',
//   'MI': 'Michigan',
//   'MN': 'Minnesota',
//   'MS': 'Mississippi',
//   'MO': 'Missouri',
//   'MT': 'Montana',
//   'NE': 'Nebraska',
//   'NV': 'Nevada',
//   'NH': 'New Hampshire',
//   'NJ': 'New Jersey',
//   'NM': 'New Mexico',
//   'NY': 'New York',
//   'NC': 'North Carolina',
//   'ND': 'North Dakota',
//   'OH': 'Ohio',
//   'OK': 'Oklahoma',
//   'OR': 'Oregon',
//   'PA': 'Pennsylvania',
//   'RI': 'Rhode Island',
//   'SC': 'South Carolina',
//   'SD': 'South Dakota',
//   'TN': 'Tennessee',
//   'TX': 'Texas',
//   'UT': 'Utah',
//   'VT': 'Vermont',
//   'VA': 'Virginia',
//   'WA': 'Washington',
//   'WV': 'West Virginia',
//   'WI': 'Wisconsin',
//   'WY': 'Wyoming'
// };

// const parsePdf = async (filePath) => {
//   const dataBuffer = fs.readFileSync(filePath);
//   const data = await pdfParse(dataBuffer);
//   return data.text;
// };

// const convertPdfToXlsx = async (pdfFilePath, outputXlsxPath) => {
//   try {
//     // Step 1: Parse the PDF and get the text content
//     const pdfText = await parsePdf(pdfFilePath);

//     // Step 2: Split the text into lines
//     const lines = pdfText.split('\n').map(line => line.trim()).filter(line => line);

//     // Step 3: Parse each line into respective fields
//     const parsedData = lines.map(line => {
//       const storeNumber = line.substring(0, 4).trim();

//       const phoneMatch = line.match(/\(\d{3}\) \d{3}-\d{4}$/);
//       const phone = phoneMatch ? phoneMatch[0] : '';

//       const pinCodeMatch = line.match(/\d{5}-\d{4}/);
//       const pinCode = pinCodeMatch ? pinCodeMatch[0] : '';

//       // Removing store number, phone, and PIN code from the line to get the remaining address
//       let remaining = line
//         .replace(storeNumber, '')
//         .replace(phone, '')
//         .replace(pinCode, '')
//         .trim();

//       // State is identified by matching the state code from the stateCodes object
//       const stateMatch = remaining.match(/[A-Z]{2}$/);
//       const stateCode = stateMatch ? stateMatch[0] : '';
//       const stateName = stateCodes[stateCode] || '';

//       // Remove the state code from the remaining string
//       remaining = remaining.replace(stateCode, '').trim();

//       // City is the last word in the remaining string
//       const city = remaining.split(' ').pop();

//       // Address is whatever is left in the remaining string after removing the city
//       const address = remaining.replace(city, '').trim();

//       return {
//         StoreNumber: storeNumber,
//         Address: address,
//         City: city,
//         State: stateName,
//         PINCode: pinCode,
//         Phone: phone,
//       };
//     });

//     // Step 4: Convert parsed data to an Excel sheet
//     const worksheet = XLSX.utils.json_to_sheet(parsedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Stores');

//     // Step 5: Write the workbook to an Excel file
//     XLSX.writeFile(workbook, outputXlsxPath);

//     console.log(`Excel file created successfully at ${outputXlsxPath}`);
//   } catch (error) {
//     console.error('Error converting PDF to Excel:', error);
//   }
// };
//         .replace(pinCode, '')
//         .trim();

//       // State is identified by matching the state code from the stateCodes object
//       const stateMatch = remaining.match(/[A-Z]{2}$/);
//       const stateCode = stateMatch ? stateMatch[0] : '';
//       const stateName = stateCodes[stateCode] || '';

//       // Remove the state code from the remaining string
//       remaining = remaining.replace(stateCode, '').trim();

//       // City is the last word in the remaining string
//       const city = remaining.split(' ').pop();

//       // Address is whatever is left in the remaining string after removing the city
//       const address = remaining.replace(city, '').trim();

//       return {
//         StoreNumber: storeNumber,
//         Address: address,
//         City: city,
//         State: stateName,
//         PINCode: pinCode,
//         Phone: phone,
//       };
//     });

//     // Step 4: Convert parsed data to an Excel sheet
//     const worksheet = XLSX.utils.json_to_sheet(parsedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Stores');

//     // Step 5: Write the workbook to an Excel file
//     XLSX.writeFile(workbook, outputXlsxPath);

//     console.log(`Excel file created successfully at ${outputXlsxPath}`);
//   } catch (error) {
//     console.error('Error converting PDF to Excel:', error);
//   }
// };
//         .replace(pinCode, '')
//         .trim();

//       // State is identified by matching the state code from the stateCodes object
//       const stateMatch = remaining.match(/[A-Z]{2}$/);
//       const stateCode = stateMatch ? stateMatch[0] : '';
//       const stateName = stateCodes[stateCode] || '';

//       // Remove the state code from the remaining string
//       remaining = remaining.replace(stateCode, '').trim();

//       // City is the last word in the remaining string
//       const city = remaining.split(' ').pop();

//       // Address is whatever is left in the remaining string after removing the city
//       const address = remaining.replace(city, '').trim();

//       return {
//         StoreNumber: storeNumber,
//         Address: address,
//         City: city,
//         State: stateName,
//         PINCode: pinCode,
//         Phone: phone,
//       };
//     });

//     // Step 4: Convert parsed data to an Excel sheet
//     const worksheet = XLSX.utils.json_to_sheet(parsedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Stores');

//     // Step 5: Write the workbook to an Excel file
//     XLSX.writeFile(workbook, outputXlsxPath);

//     console.log(`Excel file created successfully at ${outputXlsxPath}`);
//   } catch (error) {
//     console.error('Error converting PDF to Excel:', error);
//   }
// };

// // Run the conversion
// const pdfFilePath = 'Garland-Ventures-Store-List.pdf'; // Replace with the path to your PDF file
// const outputXlsxPath = 'output.xlsx'; // Replace with the desired output Excel file path
// convertPdfToXlsx(pdfFilePath, outputXlsxPath);
// const fs = require('fs')
// const XLSX = require('xlsx');

// const removeSecondRow = (inputXlsxPath, outputXlsxPath) => {
//   const workbook = XLSX.readFile(inputXlsxPath);

//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];

//   const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// //   data.splice(1, 1);
//     let js = {}
//     for (let i = 2; i < data.length; i++) {
//         // const s = data[i][1] + ","+data[i][2] +  "," + data[i][3];
//         const t = String(data[i][3])
//         if (js[t] === undefined ) js[t] =[data[i]];
//         else js[t].push(data[i])
//     }

// //   const newWorksheet = XLSX.utils.aoa_to_sheet(data);

// //   workbook.Sheets[sheetName] = newWorksheet;

// //   XLSX.writeFile(workbook, outputXlsxPath);
//     js = JSON.stringify(js)
//     fs.writeFileSync('stores.json', js, (err) => {
//         if (err) {
//             console.error('Error writing file', err);
//             } else {
//             console.log('JSON file has been written successfully');
//         }
//     })

// };

// // Run the function
// const inputXlsxPath = 'output.xlsx'; // Replace with the path to your input Excel file
// const outputXlsxPath = 'newUpdated.xlsx'; // Replace with the desired output Excel file path
// removeSecondRow(inputXlsxPath, outputXlsxPath);

const fs = require('fs')

async function sizeReducer() {
    const data = JSON.parse(fs.readFileSync('stores.json'))
    let reducedData = {}
    let c  =0;
    for (const key in data){
        if (data[key].length < 11) reducedData[key] = data[key];
        else reducedData[key] = data[key].splice(0, 10);
    }

    reducedData = JSON.stringify(reducedData);
    fs.writeFileSync('reducedStores.json', reducedData, (err) => {
        if (err){
            console.log(err);
        }else {
            console.log("Write succcessful")
        }
    })
}

sizeReducer()