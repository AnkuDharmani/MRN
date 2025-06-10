const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const connectMongoDB = require('./connection');
const userRouter = require('./routes/user');
const playerRouter = require('./routes/player');
const staticRouter = require('./routes/static');

const app = express();

// Connect to MongoDB
connectMongoDB(process.env.MONGODB_URI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/user', userRouter);
app.use('/player', playerRouter);
app.use('/', staticRouter);

    

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
