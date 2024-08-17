const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  centerId:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
  phoneNumber:{
    type:String,
    required:true
  },
  typeOfWP:{ // type of working place
    type:String,
    required:true
  }
}, {
  timestamps: true,
});

employeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  
  employeeSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const Employee = mongoose.model('Employee', employeeSchema);

  module.exports=Employee