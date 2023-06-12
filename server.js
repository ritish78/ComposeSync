const express = require('express');
const connectToMongoDB = require('./config/db');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
dotenv.config();

const app = express();
const httpServer = http.createServer(app);

//Connect to MongoDB
connectToMongoDB();

//Intiliazing middleware
app.use(express.json({ extended: false }));
app.use(cors());

const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT;

app.get('/', (req, res) => {
    res.send({ message: 'API Woking fine' });
})


//Initializing socket.io
const io = new Server(httpServer, 
    {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }}
)

io.on('connection', socket => {
    console.log('CONNECTED!');
    socket.on('get-document', documentInfo => {
        socket.join(documentInfo.documentId);
        socket.emit('load-document', documentInfo.data);
    })
    socket.on('send-changes', documentInfo => {
        socket.broadcast.to(documentInfo.documentId).emit('receive-changes', documentInfo.delta);
    })

    socket.on('save-document', documentInfo => {
        socket.broadcast.to(documentInfo.documentId).emit('save-document', documentInfo.data);
    })
})


//Defining routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/documents', require('./routes/api/document'));
app.use('/api/profile', require('./routes/api/profile'));

httpServer.listen(EXPRESS_SERVER_PORT, () => console.log('Server listening on port', EXPRESS_SERVER_PORT));