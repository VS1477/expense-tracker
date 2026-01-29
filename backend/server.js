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
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://expense-tracker-ten-chi-91.vercel.app" // Vercel deployment
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true); // origin allowed
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// parse incoming JSON before hitting routes
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use(routes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});




const PORT = process.env.port || 3000;

mongoconnect().then(app.listen(PORT,()=>{
    console.log(`The App is listening on ${PORT}`);
}));
