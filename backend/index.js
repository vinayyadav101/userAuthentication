require('dotenv').config();

const port = process.env.PORT;

const app = require('./app');


app.listen(port, ()=>{
    console.log(`server is listening at http://localhost:${port}`)
});