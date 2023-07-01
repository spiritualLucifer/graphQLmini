const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Please provide your email"]
    },
    phone:{
        type:String
    }
})

module.exports =  mongoose.model('Client',ClientSchema)