const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
router.get('/', (req, res) => {
    res.send("Home")
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    console.log(req.body)
    User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exits with that email" })
        }
        //most secure password dude
        bcrypt.hash(password, 12).then(hashedpassword => {
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
            user.save()
                .then(user => {
                    res.json({ message: "saved succesfully" })
                })
                .catch(err => {
                    console.log(err)
                })
        })

    })
        .catch(err => {
            console.log(err)
        })

})

router.post('/signin',(req,res)=>{
    const{email,password} = req.body
    if(!email||!password){
        return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                res.json({message:"succesfully signed in"})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router