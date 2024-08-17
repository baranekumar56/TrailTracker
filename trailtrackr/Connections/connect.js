const mongoose = require('mongoose');
require('dotenv').config();
const url = "mongodb+srv://baranekumar56:barane@cluster0.hc5ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const connectDB = async () => {
    try {
      await mongoose.connect(url);
      console.log('Connected to MongoDB successfully');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1); 
    }
  };
  
  module.exports = connectDB;

