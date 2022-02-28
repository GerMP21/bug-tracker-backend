const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 5000;
const app = express();

//Configure dotenv
dotenv.config();

//Connect to MongoDB
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('Connected to MongoDB')
);

//Configure middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

//Use routes


//Listen to port
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});