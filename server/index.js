const express = require('express');
const db = require('./config/database/index');
const cors = require('cors');
const socketServer = require('./socket-server');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');

//connect express
const app = express();
//Define app use json
app.use(express.json());
//Define cors to orther domain access
app.use(cors());
//connect mongoDB
db.connect();

//define api of user
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


const PORT = process.env.PORT || 5000;

//Define socket
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    console.log('Connect socket.io successfully');
    socketServer(socket);
})

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));