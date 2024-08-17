const connectDB = require('../Connections/connect');
const mongoose = require('mongoose')
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routers/auth_router');
const detailDriver=require('../routers/driverrouter');
const departments=require('../routers/departments');
const endpoints=require('../routers/endpoints');
const trips = require("../routers/trips")
const fs = require('fs')
const app = express();
dotenv.config();
// connectDB();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const data = JSON.parse(fs.readFileSync('./resources/dc.json'));
const locations = JSON.parse(fs.readFileSync('./resources/posbylocationIQ.json'));
let res = []
let c = 0;

for (const i of data){
  
    if (locations[i['location']]) {
        const d = locations[i['location']]
        let obj = {}
        let id = i['location']
        let typee = 'DC'
        if (id.charAt(1) == 'F'){ id = id.substring(3, 7); typee = "FC";}
        else id = id.substring(1,5)
        obj['centerId'] = id
        obj['type'] = typee
        obj['address'] = i['address']
        obj['city'] = i['city']
        obj['state'] = i['state']
        obj['location'] = {'latitude':Number(d['Latitude']), 'longitude':Number(d['Longitude'])}
        res.push(obj)
        
    }
 
}

fs.writeFileSync('./data/centerData.json', JSON.stringify(res), (err) => {
    if (err) console.log("0")
    else console.log("1")
})

