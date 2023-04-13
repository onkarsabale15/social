const mongoose = require('mongoose')

import { ObjectId } from 'mongoose'

const followSchema = new mongoose.Schema({
    id:{
        type:ObjectId,
        ref:"User"
    },
    following:[{
        type:ObjectId,
        ref:"User"
    }],
    followers:[{
        type:ObjectId,
        ref:"User"
    }]
})

module.exports = mongoose.model('Follow', followSchema)