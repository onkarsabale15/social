const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY
const mongoose = require("mongoose");
const userModel = mongoose.model("User");
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: "You Must Be Logged In" })
    }else{
    const token = authorization.replace("Bearer","");
    jwt.verify(token,JWT_KEY,(err,payload)=>{
        if(err){
            return res.status(401).json({
                error:"You Must Be Logged In"
            })
        }
        const _id = payload.id
        userModel.findById(_id).then(userdata=>{
            userdata.password = undefined
            req.user = userdata
            next()
        })
    })}
}