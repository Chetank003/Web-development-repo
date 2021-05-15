const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(request) {
  var fname = request.body.fname;
  var lname = request.body.lname;
  var email = request.body.email;
  console.log(fname + " " + lname + " " + email);
});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});