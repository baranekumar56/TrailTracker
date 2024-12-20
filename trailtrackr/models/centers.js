const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  }
});



const centerSchema = new mongoose.Schema({
  centerId:{
    type:String,
    required:true
  },
  address: {
    type: String,
    required: true,
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required: true
  },
  location: {
    type: locationSchema, 
    required: true,
  },
  type:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String
  },
}, {
  timestamps: true, 
});

const Center = mongoose.model('Center', centerSchema);




module.exports = Center;
