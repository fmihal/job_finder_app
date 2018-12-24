const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Database
const db = require("./config/database");

// Test DB

db.authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch(err => console.log("Error:", err));

const app = express();

//Handlebars
app.engine("handlebars", exhbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body parser
app.use(bodyParser.urlencoded({extended: false}))

//Set static views
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

app.use("/jobs", require("./routes/jobs"));

const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
