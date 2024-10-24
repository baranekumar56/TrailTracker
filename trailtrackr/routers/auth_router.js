const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Employee = require('../models/login');

const generateToken = (id) => {
  return jwt.sign({ id }, 12345, {
    expiresIn: '30d',
  });
};

const register =  async (req, res, next) => {
    const { name, password, centerId } = req.body;
  
    try {
      // const employeeExists = await Employee.findOne({ email });
      
      // if (employeeExists) {
      //   return res.status(400).json({ message: 'Employee already exists' });
      // }
  
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
      const employee = await Employee.create({
        name,
        password,
        centerId,
        verificationCode,
      });
  
      res.status(201).json({
        message: 'Employee registered. Please verify your account.',
        verificationCode, // In a real application, do not return this in the response.
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering employee', error });
    }
  }
  
  const verify =  async (req, res) => {
    const { name, password, centerId, verificationCode } = req.body;
  
    try {
      const employee = await Employee.findOne({ name });
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      if (employee.verificationCode === verificationCode) {
        employee.verified = true;
        employee.verificationCode = null;
        await employee.save();
  
        res.status(200).json({ message: 'Employee verified successfully' });
      } else {
        res.status(400).json({ message: 'Invalid verification code' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error verifying employee', error });
    }
  };

  router.post('/login', async (req, res) => {
    const { name, password, centerId, token } = req.body;
    console.log(name , password);
    try {
      const employee = await Employee.findOne({ name });
      if (!employee || employee.password !== password || employee.centerId !== centerId) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // const token = generateToken(employee._id);
  const d = {
    _id: employee._id.toString(),
    name: employee.name,
    centerId: employee.centerId,
    typeOfWP:employee.typeOfWP
  };
  console.log(d)
  res.setHeader('Content-Type', 'application/json');
      res.status(200).json(d);
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });
  
  module.exports = router;
