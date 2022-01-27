const mongoose=require('mongoose');
const senSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    orgname:{
        type:String,
        required:true
    },
    orgaddress:{
        type:String,
        required:true
    },
    orglogo:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("senderdata",senSchema);