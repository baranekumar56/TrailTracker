const axios = require('axios');
const fs = require('fs')
const cheerio = require('cheerio');
const { json } = require('body-parser');

const url = 'https://warehouse.ninja/walmart-distribution-center-locations/';

const scrapeWalmartCenters = async () => {
  try {
    // const { data } = await axios.get(url);
    // const $ = cheerio.load(data);

    // // Array to store the scraped details
    // const storeDetails = [];

    // // Modify this selector based on the website structure
    // $('.entry-content table tbody tr').each((index, element) => {
    //   const columns = $(element).find('td');
    // //   console.log(columns);
    //   const location = $(columns[0]).text().trim();
    //   const address = $(columns[1]).text().trim();
    //   const city = $(columns[2]).text().trim();
    //   const state = $(columns[3]).text().trim();

    //   if (location && address && city && state) {
    //     storeDetails.push({ location, address, city, state });
    //   }
    // });
    
    // const jsonDCString = JSON.stringify(storeDetails);

    // fs.writeFile('dc.json', jsonDCString,(err) => {
    //     if (err) {
    //         console.error('Error writing file', err);
    //       } else {
    //         console.log('JSON file has been written successfully');
    //       }
    // })
    
    // const d = fs.readFileSync('dc.json','utf-8');
    // const v = JSON.parse(d);
    // console.log(v)

    // storeDetails.forEach(e => {
    //     console.log(e);
    // })
  } catch (error) {
    console.error('Error occurred while scraping:', error);
  }
};

scrapeWalmartCenters();
