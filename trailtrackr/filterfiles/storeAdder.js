const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs')

const apiKey = 'pk.4ab0f60863c3407d54114b1817a02d96';
var stores = fs.readFileSync('./reducedStoreLocations3.json', 'utf-8');
stores = JSON.parse(stores)

let founded_states = {}
let found_count = 0;
const geocodeAddress = async (i, key) => {
    const addresss = i[1] + "," + i[2] +","+i[3]
  try {
    if (stores[key] !== undefined) return;
    const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
        params: {
          key: apiKey,
          q: addresss,
          format: 'json'
        }
      });
    if (response.data.length > 0) {
      const location = response.data[0];
      found_count++;
   
      founded_states[key] = {Latitude:location.lat, Longitude:location.lon}
    } else {
      console.log(`Geocoding failed: No results found for ${i['location']}`);
    }
  } catch (error) {
    console.error('Error occurred:', error);
    
  }


};

const printLocations = async () => {

let data = fs.readFileSync('./resources/reducedStores.json', 'utf8');
data = await JSON.parse(data)
let k  =0;
delete data['']
for (const i in data ){
    for (j of data[i]){
        ++k
        if (k % 5 == 0) setTimeout(()=>{}, 500);
        await geocodeAddress(j, j[0] )
    }
    
}
console.log(found_count)
console.log(founded_states)
const d = JSON.stringify(founded_states);
fs.writeFile('reducedStoreLocations4.json', d, (err) => {
    if (err) {
        console.error('Error writing file', err);
        } else {
        console.log('JSON file has been written successfully');
    }
})

}
// printLocations();


// async function doo(){
//     const d1 = JSON.parse(fs.readFileSync('./reducedStoreLocations3.json','utf-8'));

//     const d2 = JSON.parse(fs.readFileSync('./reducedStoreLocations4.json','utf-8'));
//     const d3 = {...d1, ...d2}
//     fs.writeFileSync('./reducedStoreLocations.json', JSON.stringify(d3));
//     console.log("Written Successfully")
//     let c = 0;
//     for (i in d3) c++;
//     console.log(c)
// }

// doo();
// printLocations();
// geocodeAddress(address);


// let d  = fs.readFileSync('posbylocationIQ.json','utf8')
// d = JSON.parse(d)

// let x = fs.readFileSync('dc.json', 'utf8')
// x = JSON.parse(x)

// const not_founded_ids = []

// for (i of x){
//     if (d[i['location']] === undefined) not_founded_ids.push(i)
// }

// const f = async (i) => {
//     let k = 0;
//     for(k of not_founded_ids){
//         k++;
//         if (k % 10 == 0) setTimeout(()=>{}, 500);
//         await geocodeAddress(k);
//     }
//     console.log(found_count)
// console.log(founded_states)
// const y = JSON.stringify(founded_states);
// fs.writeFile('posbylocationIQ2.json', y, (err) => {
//     if (err) {
//         console.error('Error writing file', err);
//         } else {
//         console.log('JSON file has been written successfully');
//     }
// })

// }


// f();
