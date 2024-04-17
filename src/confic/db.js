// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb://127.0.0.1/walletDB'; 
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;


