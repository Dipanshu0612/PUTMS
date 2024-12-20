const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.0j2tmr7.mongodb.net/users_db`;
const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json());
const corsOptions = {
  origin: "http://putms.netlify.com",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(url)
.then(console.log("Connected to Database!"))
.catch((err) => console.log(err));

app.use("/", userRoutes);
app.use("/", adminRoutes);

app.listen(3001, (res) => {
  console.log("Listening on port 3001");
});