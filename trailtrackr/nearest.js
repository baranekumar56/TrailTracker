const GeoTree = require('geo-tree');

const tree = new GeoTree(5); 

tree.insert({data:'user1',lng: 40.7128,lat: -74.0060});
tree.insert( 34.0522, -118.2437,'user2'); 

let nearby = tree.find({lat:34, lng:-118}, 20000.0, 'mi');

console.log(nearby);