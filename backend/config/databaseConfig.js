const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

const connectDatabase = () => {
    mongoose.connect(MONGODB_URL)
            .then((c)=> console.log(`connected to DB${c.connection.host}`))
            .catch((e)=>console.log(e.message))
};

module.exports = connectDatabase;