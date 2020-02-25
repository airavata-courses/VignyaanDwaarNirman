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

const mongoU = require("./src/config/keys").mongoURI;

mongoose
  .connect(mongoU, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var Sessions = require("./src/routes/Sessions");
var UserSessions = require("./src/routes/UserSession");

app.use("/", UserSessions);
app.use("/sessions", Sessions);

app.listen(port, function() {
  console.log("Server is running on port: " + port);
});
