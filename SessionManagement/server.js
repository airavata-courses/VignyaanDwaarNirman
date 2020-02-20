var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const mongoU = require("./config/keys").mongoURI;

mongoose
  .connect(mongoU, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var Sessions = require("./routes/UserSession");

app.use("/", Sessions);

app.listen(port, function() {
  console.log("Server is running on port: " + port);
});