const axios = require('axios');

// Your LocationIQ API key
const apiKey = 'pk.4ab0f60863c3407d54114b1817a02d96';

// The address you want to geocode
const address = '1600 Pennsylvania Ave NW, Washington, DC 20500';

// Function to get latitude and longitude
async function getCoordinates(address) {
  try {
    const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
      params: {
        key: apiKey,
        q: address,
        format: 'json'
      }
    });

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

// Call the function
getCoordinates(address);
