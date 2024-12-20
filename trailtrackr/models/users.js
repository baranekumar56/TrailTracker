const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  address: {
    type: String,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  licenseNumber:{
    type: String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
}, {
  timestamps: true, 
});


const User = mongoose.model('User', userSchema);

module.exports = User;
