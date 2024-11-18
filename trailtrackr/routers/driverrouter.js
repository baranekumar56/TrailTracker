const express = require('express');
const router = express.Router();
const {authenticate, authorizeVerified}=require('./view')
const User = require('../models/users');

router.post('/createuser', async (req, res) => {
    const { name,
        password,
        address,
        vehicleId,
        licenseNumber,
        phoneNumber
    } = req.body;
  
    try {
        const usersExists = await User.findOne({ name });
      
      if (usersExists) {
        return res.status(400).json({ message: 'users already exists' });
      }
      const userdata = await drivers.create({
        name,
        password,
        address,
        vehicleId,
        licenseNumber,
        phoneNumber
      });
      await userdata.save();
      res.json(userdata);
    } catch (error) {
      res.status(500).json({ message: 'Error creating users unit', error });
    }
  });

  router.post('/login',async (req, res) => {
    
    const { name,
        password,
        } = req.body; 
        console.log(name, password);
        try{
          const userExists = await User.findOne({name:name});
          if (!userExists) {
            return res.status(400).json({ message: 'users doesnt exists' });
          }
          if (password === userExists.password){
            return res.status(200).json({message: "login success"});
          }else {
            return res.status(400).json({message:"Invalid credentials"});
          }
        }catch(err){
          console.log(err)
          res.status(500).json({ message: 'Error authenticating users unit', err });
        }
  });


  router.get('/all',async(req,res)=>{
  try{
    const result =await drivers.find();
    res.json(result);
  }
  catch(err){
    res.status(500).json({ message: 'Error accessing  users unit', error });
  }
  })



  module.exports = router;

