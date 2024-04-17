/*

1. updated the db.js and app.js files in order to connect to my local mongoDB here is the original codes:


app.js

import express from 'express';
import userRouter from './api/routes/user.js';
import connectDB from './confic/db.js';



const app = express();
connectDB()
const port = 3000;

app.use(express.json());

app.use('/api/v1',userRouter )


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});





DB.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DBURL = process.env.DB_URI;

const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');
  try {
    const conn = await mongoose.connect(DBURL);
    console.log(`MongoDB Connected✅: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;


3. Added transaaction model

Schema Definition:

i've defined a schema for our transactions using Mongoose. This schema outlines the structure of each transaction document 
in our database. Each transaction has several properties:

type: Indicates the type of transaction (top-up, transfer, or withdrawal). It's required and can only take one of these values.
amount: Represents the amount involved in the transaction. It's also required.

sender and receiver: These are references to the User model. They store the IDs of the users involved in the transaction.
timestamp: Records the time when the transaction occurs. It defaults to the current timestamp.

Model Creation:
Using the schema, i've created a Mongoose model named Transaction. This model represents the collection of transactions in our database.


4.Added transaction controller

Top-Up Transactions:
This function allows users to add funds to their account. They provide their username and 
the amount they want to add. We then find the user by their username and update their balance 
by adding the specified amount. This is useful for when users want to deposit money into their account.

Transfer Transactions:
This function facilitates transfers between users. Users specify the sender's username, receiver's username, 
and the amount they want to transfer. We find both the sender and receiver users, check if the sender has enough balance, 
then update their balances accordingly. This way users can transfer money between each other securely.

Withdrawal Transactions:
Here, users can withdraw funds from their account. They provide their username and the amount they want to withdraw. 
We find the user, check if they have enough balance then update their balance by subtracting the withdrawal amount. 
This allows users to take money out of their account when needed.



5. updated user model by adding balance schema


*/