const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const authRoute = require('./routes/authRoutes');
const stripeRoute = require('./routes/stripe');
const path = require('path');

const app = express();
dotenv.config();

// middlewares
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true
  }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', authRoute);
app.use('/api/stripe', stripeRoute);
// const uploadsPath = path.join(__dirname, 'uploads');
// app.use('/uploads', express.static(uploadsPath));



const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection with postgres was succesfull.');
    })
    .catch(err => {
        console.log('Error when trying to connect with postgres database.');
    });


const port = 6099;

app.listen(port, () => {
    console.log('Server is running... in PORT 6099');
})