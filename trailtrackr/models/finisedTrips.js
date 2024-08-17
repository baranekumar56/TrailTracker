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
  

const tripSchema = new mongoose.Schema({
    sourceId:{
        type:String,
        required:true,
    },
    destinationId:{
        type:String,
        required:true,
    },
    operatingDriver:{
        type:String,
        required:true
    },
    beingSent:{
        type:Boolean,
        required:true,
        default:true
    },
    containerId:{
        type:String,
        required:true
    },
    isFinished:{
        type:Boolean,
        default:false
    },
    previousPosition:{
        type:locationSchema,
        required:true,
    },
    positions:[
        {type:locationSchema}
    ]
});

const FTrip = mongoose.model("FTrip", tripSchema);

module.exports = FTrip;