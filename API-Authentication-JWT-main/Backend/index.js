const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors({
    origin: "*",
  }));


// Import Routes
const authRoute = require("./routes/auth");
const privateRoute = require('./routes/privateRoute');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_QUERY, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, () => {
    console.log('Successfully connected to Mongo DB');
});


// Middleware
app.use(express.json());
app.use(bodyParser.json());


// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/", privateRoute);

app.listen(3001, () => console.log("Server is Up and Running"));
