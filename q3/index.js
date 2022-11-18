const express = require("express");
const querystring = require("querystring");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static(path.join(__dirname, "css")));
app.get("/", (req, res) => {
  const date_ob = new Date();
  const hour = date_ob.getHours();
  const type = hour > 6 ? "day.css" : "night.css";
  res.render("form", { type: type });
});
app.post("/", (req, res) => {
  console.log(req.body);
  const query = querystring.stringify({
    name: req.body.name,
    age: req.body.age,
  });
  res.redirect("/result?" + query);
});
app.get("/result", (req, res) => {
  let name = req.query.name;
  let age = req.query.age;
  if (!name) {
    name = "person";
  }
  if (!age) {
    age = 0;
  }
  res.send(`Post Success! name:${name} Age:${age}`);
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
