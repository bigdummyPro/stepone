const express = require('express');
const db = require('./config/database/index');
const cors = require('cors');
const socketServer = require('./socket-server');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const notificationRouter = require('./routes/notificationRoute');
const postRouter = require('./routes/postRoute');
const commentRouter = require('./routes/commentRoute');
const messageRouter = require('./routes/messageRoute');
const storiesRouter = require('./routes/storiesRoute');


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
//define api of notification
app.use('/api/notification', notificationRouter);
//define api of post
app.use('/api', postRouter);
//define api of comment
app.use('/api/comment', commentRouter);
//define api of message
app.use('/api/message', messageRouter);
//define api of stories
app.use('/api/stories', storiesRouter)


const PORT = process.env.PORT || 443;

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
