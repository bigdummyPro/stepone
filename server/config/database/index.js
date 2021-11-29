require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@social-website.ida0g.mongodb.net/Social-Website?retryWrites=true&w=majority`, {
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