const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoconnect = async ()=>
{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Hey the Database is connected Successfully");
    }
    catch(Err)
    {
        console.log(`The error is : ${Err}`);
    }
};
module.exports = mongoconnect;