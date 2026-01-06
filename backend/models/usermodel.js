const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true,"Please enter your name"]
        },
        email : {
            type : String,
            required : [true,"It is necessary"],
            unique : true
        },
        password : {
            type : String,
            required : [true,"Password is required"],

        },
        
    },
    {
        timestamps : true
    }
);

const usermodels = mongoose.model("expenseuser",userschema);

module.exports = usermodels;
