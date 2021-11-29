const express = require('express');
const db = require('./config/database/index');
const cors = require('cors');

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

const http = require('http').createServer(app)
http.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));