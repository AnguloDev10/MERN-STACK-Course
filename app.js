const express = require('express')
const app = express()
const PORT = 8080

app.get('/home',(req,res)=>{
    res.send("Home")
})
app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
