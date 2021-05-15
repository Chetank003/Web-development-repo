const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

let items = ["Eat", "Sleep", "Repeat"];
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  let day = new Date().toLocaleDateString('en-us', options);
  res.render("index.ejs", {
    typeOfList: day,
    newItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.item;
  if (req.body.submit === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("index.ejs", {
    typeOfList: "Work List",
    newItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about.ejs");
});

app.listen(3000, function() {
  console.log("App running at port 3000");
});