const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const bp = require('body-parser');
const userModel = mongoose.model("User")
// router.use(bp.urlencoded({extended:true}))
router.get('/',(req,res)=>{
    userModel.find({ email:"onkarsabale15@gmail.com" }).then(doc => {
        console.log(doc[0].name)
        res.send(doc[0])
    }).catch(err => {
        console.log(err)
    })
});

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    if (!email||!name||!password) {
        res.status(422).json({error:"All Fields Are Mandatory"})
    };
    res.json({message:"Your data is sent successfully"})
});

module.exports = router