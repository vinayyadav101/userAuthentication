const express = require('express');
const app = express();

const cookieparser = require('cookie-parser');
const cors = require('cors');


const connectDatabase = require('./config/databaseConfig');

const authRouter = require('./router/authRouth');

connectDatabase();


app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: process.env.CLIENT_URL , 
    credentials: true
}));

app.use('/api/auth' , authRouter)


app.use('/' , (req, res) => {
    res.status(200).json({
        data: 'JWTauth server'
    })
});

module.exports = app;