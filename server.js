const express = require('express');
const connectToMongoDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//Connect to MongoDB
connectToMongoDB();

//Intiliazing middleware
app.use(express.json({ extended: false }));

const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT;

app.get('/', (req, res) => {
    res.send({ message: 'API Woking fine' });
})


app.listen(EXPRESS_SERVER_PORT, () => console.log('Server listening on port', EXPRESS_SERVER_PORT));