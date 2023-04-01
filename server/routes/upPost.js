const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const postModel = mongoose.model("Post")
router.get("/allPosts", requireLogin, (req, res) => {
    postModel.find()
        .populate("postedBy", "_id name")
        .then(foundPosts => {
            res.json(foundPosts)
        }).catch(err => {
            console.log(err)
        })
})

router.post("/createPost", requireLogin, (req, res) => {
    const { title, body, photo } = req.body
    if (!title || !body || !photo) {
        res.status(422).json({ error: "All Field ie Title, Body and Image are Mandatory in order to make a post" })
    } else {
        const newPst = new postModel({
            title,
            body,
            photo,
            postedBy: req.user
        })
        newPst.save().then(savedPost => {
            res.json({
                // post: savedPost,
                message: "Post Successfull"
            })
        }).catch(err => {
            console.log(err)
        })
    }
})

router.put("/comment", requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user
    }
    postModel.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{new:true}).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.get("/myPosts", requireLogin, (req, res) => {
    postModel.find({ postedBy: req.user })
        .populate("postedBy", "_id name")
        .then(myPost => {
            if (!myPost[0]) {
                res.json({ message: "No Posts to Load" })
            } else {
                res.json(myPost)
            }
        }).catch(err => {
            console.log(err)
        })
})


module.exports = router