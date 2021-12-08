const express = require('express')
const app = express()
const PORT = 8080

const customMiddleare = (req,res,next)=> {
    console.log("middleare executed!!")
    next()
}


app.get('/',(req,res)=>{
   console.log("Home")
    res.send("hello word")
})

app.get('/about',customMiddleare,(req,res)=>{
    console.log("About page")
    res.send("about")
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
