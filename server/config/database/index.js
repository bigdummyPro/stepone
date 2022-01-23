require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://butterfly:butterfly@cluster0.dzya5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('Connect database successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
} 

module.exports = {connect}
