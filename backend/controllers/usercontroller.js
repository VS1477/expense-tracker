const usermodels = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
// LOGIN
const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isuserthere = await usermodels.findOne({ email });
    
    if (!isuserthere) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const credentials = await bcrypt.compare(password,isuserthere.password);

    if(credentials)
    {
      res.status(200).json({
        success : true,
        user:isuserthere,
        message : "User Login successfull",
        jwttoken : jwt.sign({email:email},process.env.KEY,{expiresIn:"24h"}),
      })
    }
    else
    {
      res.status(400).json({
        message:"wrong credentials"
      })
    }




  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};

// REGISTER
const registercontroller = async (req, res) => {
  try {

    const { name, email, password } = req.body;
    const saltround = 10;
    const hashpassword = await bcrypt.hash(password,saltround);
    console.log(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isuser = await usermodels.findOne({ email });

    if (isuser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const newuser = await usermodels.create({ name, email, password : hashpassword });

    res.status(201).json({
      success: true,
      newuser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};

module.exports = { registercontroller, logincontroller };
