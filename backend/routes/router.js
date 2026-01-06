const express = require("express");
const router = express.Router();
const {logincontroller,registercontroller} = require("../controllers/usercontroller");



router.post("/login",logincontroller);

router.post("/register",registercontroller);

module.exports = router;