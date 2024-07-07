const express = require('express')
const path = require('path')

const prot = 3000;

const app = express();



app.use(express.static(path.join(__dirname , '/src')))

app.get('/login' , (req , res) => {
    res.sendFile(path.join(__dirname , '/public/login.html'))
})
app.get('/singup' , (req , res) => {
    res.sendFile(path.join(__dirname , '/public/singup.html'))
})
app.get('/user' , (req , res) => {
    res.sendFile(path.join(__dirname , '/public/userData.html'))
})
app.get('/forgetpassword' , (req,res)=> {
    res.sendFile(path.join(__dirname , '/public/forgetPassword.html'))

})
app.listen(prot , ()=>{
    console.log(`your site is runing port:${prot}`);
})

