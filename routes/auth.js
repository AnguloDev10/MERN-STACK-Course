const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    res.send("Home")
})

router.post('/signup',(req,res)=>{
   const {name,email,password} = req.body
   if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"})
   }
   console.log(req.body)
   res.json({message:"successfuly posted"})
})


module.exports=router