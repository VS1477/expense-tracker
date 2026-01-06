const express = require("express");
const colors =  require("colors");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
const mongoconnect = require("./config/connect");
const router = require("./routes/router");
const routes = require("./routes/transactionroutes");


//rest object
const app = express();



//middlewares
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
// parse incoming JSON before hitting routes
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use(routes);





const PORT = process.env.port || 3000;

mongoconnect().then(app.listen(PORT,()=>{
    console.log(`The App is listening on ${PORT}`);
}));