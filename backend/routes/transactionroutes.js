const express = require("express");
const routes = express.Router();
const {getdata,adddata} = require("../controllers/transactioncontroller");

// routes

routes.post("/getdata",getdata);
routes.post("/adddata",adddata);

module.exports = routes;