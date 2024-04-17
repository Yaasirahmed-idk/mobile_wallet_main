import express from 'express';
import userRouter from './api/routes/user.js';
import connectDB from './confic/db.js';
const app = express();
const port = 3000; //  port for Express server

app.use(express.json());
app.use('/api/v1', userRouter);

// Connect to MongoDB
connectDB().then(db => {
  // Start Express server
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});
