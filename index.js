const express = require('express');
const app = express();
require('dotenv').config();

const connectMongoDB = require('./connection');
const userRouter = require('./routes/user');
const PlayerRoute = require('./routes/player');

// Connect to MongoDB
connectMongoDB(process.env.MONGODB_URI);

// Routes
app.use(express.json());
app.use('/user', userRouter);
app.use('/player',PlayerRoute)


// Start server
app.listen(8000, () => {
    console.log(`Server started on port ${8000}`);
});