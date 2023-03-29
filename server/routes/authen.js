const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const userModel = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const requireLogin = require('../middleware/requireLogin');
router.get('/', requireLogin, (req, res) => {
    console.log("This Is Home Page")
    res.send("Home Page")
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "All Fields Are Mandatory" })
    } else {
        userModel.findOne({ email: email }).then(userExists => {
            if (!userExists) {
                res.status(422).json({ error: "Invalid Email or Password" })
            } else {
                bcrypt.compare(password, userExists.password).then(doMatch => {
                    if (doMatch) {
                        const jwt_token = jwt.sign({ id: userExists._id }, process.env.JWT_KEY)
                        const {_id, name, email} = userExists;
                        res.json({ message: "Successsfully Logged in Redirecting To Home Page", token: jwt_token,user:{_id, name, email}})
                    } else {
                        res.status(422).json({ error: "Invalid Email or Password" })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        res.status(422).json({ error: "All Fields Are Mandatory" })
    } else {
        userModel.findOne({ email: email }).then(userExists => {
            if (userExists) {
                res.status(422).json({ error: "User Already Exist using same Email Id <b>Use Another Email Id</b>" })
            } else {
                bcrypt.hash(password, 10).then(
                    hashedpasswd => {
                        const usr = new userModel({
                            name,
                            email,
                            password: hashedpasswd
                        })
                        usr.save().then(user => {
                            res.json({ message: "User Saved redirecting to Signin page" })
                        }).catch(err => {
                            console.log(err)
                        })
                    })
            }
        })
    }
});
module.exports = router