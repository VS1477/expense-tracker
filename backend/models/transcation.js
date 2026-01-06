const mongoose = require("mongoose");


const transactionschema = new mongoose.Schema({
    userid:{
        type:String,
        required:[true,"It is mandatory"]
    },
    amount:{
        type : Number,
        required : [true,"Amount is required"]
    },
    type:
    {
        type:String,
        required:[true,"Type is Required"]

    },
    category:
    {
        type: String,
        required : [true,"Category is Required"]
    },
    reference:
    {
        type : String,
        
    },
    description:
    {
        type : String,
        required :[true,"Description is required"]
    },
    date:
    {
        type:Date,
        required:[true,"Date is required"]
    }
},{timestamps:true});

const transactionmodel = mongoose.model("transactions",transactionschema);

module.exports = transactionmodel;