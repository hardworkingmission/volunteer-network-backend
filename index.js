const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const port=process.env.PORT||5000

app.use(express.json())
app.use(cors({origin:true}))

app.get('/',(req,res)=>{
    res.send('Welcome to Volunteer Network')
})

app.listen(port,()=>{
    console.log('Listening on:',port);
})

