const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;

let connection;
const connectMongo = async () => {
    try {
        connection = await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error while connecting to MongoDB');
        console.log('MongoURL:', mongodbUrl)
        process.exit(1);
    }
}

const closeMongo = async () => {
    try {
        await connection.close();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = {
    connectMongo,
    closeMongo
};