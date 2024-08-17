const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs')

const apiKey = 'pk.4ab0f60863c3407d54114b1817a02d96';

let founded_states = {}
let found_count = 0;
const geocodeAddress = async (i) => {
    const addresss = i['address'] + "," +i['city'] +","+i['state']

  const encodedAddress = encodeURIComponent(addresss);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=5`;

  try {

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
    //   console.log(response.data);
    //   console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
      founded_states[i['location']] = {Latitude:location.lat, Longitude:location.lon}
    } else {
      console.log(`Geocoding failed: No results found for ${i['location']}`);
    }
  } catch (error) {
    console.error('Error occurred:', error);
    
  }


};


const printLocations = async () => {
  
let data = fs.readFileSync('dc.json', 'utf8');
data = JSON.parse(data)
let k  =0;
for (i of data ){
    if (k % 10 == 0) setTimeout(()=>{}, 500);
    await geocodeAddress(i)
}
console.log(found_count)
console.log(founded_states)
const d = JSON.stringify(founded_states);
fs.writeFile('posbylocationIQ.json', d, (err) => {
    if (err) {
        console.error('Error writing file', err);
        } else {
        console.log('JSON file has been written successfully');
    }
})

}


// printLocations();
// geocodeAddress(address);


let d  = fs.readFileSync('posbylocationIQ.json','utf8')
d = JSON.parse(d)

let x = fs.readFileSync('dc.json', 'utf8')
x = JSON.parse(x)

const not_founded_ids = []

for (i of x){
    if (d[i['location']] === undefined) not_founded_ids.push(i)
}

const f = async (i) => {
    let k = 0;
    for(k of not_founded_ids){
        k++;
        if (k % 10 == 0) setTimeout(()=>{}, 500);
        await geocodeAddress(k);
    }
    console.log(found_count)
console.log(founded_states)
const y = JSON.stringify(founded_states);
fs.writeFile('posbylocationIQ2.json', y, (err) => {
    if (err) {
        console.error('Error writing file', err);
        } else {
        console.log('JSON file has been written successfully');
    }
})

}


f();
