const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
//import routes

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected..."));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use("/api", userRoutes);
app.use("/api", authRoutes);

const port = process.emit.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port 8000`);
});
