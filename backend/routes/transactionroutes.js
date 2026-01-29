const express = require("express");
const routes = express.Router();
const {getdata,adddata,editdata,deletedata} = require("../controllers/transactioncontroller");

// routes

routes.post("/getdata",getdata);
routes.post("/editdata",editdata);
routes.post("/adddata",adddata);
routes.post("/deletedata",deletedata)

module.exports = routes;