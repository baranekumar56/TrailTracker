const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs')
const Store = require('./models/store.js')
const mongoUrl = "mongodb+srv://baranekumar56:barane@cluster0.hc5ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


async function addCeter() {

    mongoose.connect(mongoUrl).then(()=>{
        console.log("connected successfully");
    }).catch((err)=>{
        console.log("Failed to connect:", err)
    })
    
    const data = JSON.parse(fs.readFileSync('./data/storeData.json', 'utf-8'));

for (const i of data ){
    const centerData = {
        centerId:i['centerId'],
        type:i['type'],
        address:i['address'],
        city:i['city'],
        state:i['state'],
        location:{
            latitude:i['location']['latitude'],
            longitude:i['location']['longitude']
        },
        phoneNumber:i['phoneNumber']
    }
    try{
    const d = new Store(centerData)
    await d.save();
    console.log("Center: ",i['centerId'], " addded succcessfully");
    }catch(err){
        console.log('Error adding center: ', i['centerId'], err)
    }
    
}
mongoose.connection.close();
}


addCeter();
