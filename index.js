const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

//Configure dotenv
dotenv.config();

const PORT = process.env.PORT;
const app = express();

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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/comments', require('./routes/comments'));

//Listen to port
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});