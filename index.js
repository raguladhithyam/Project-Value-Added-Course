const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');

// mongoose.connect("mongodb://localhost:27017/srms", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://srms:Projectsrms@2022@cluster0.owobpsm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.json());
app.use(express.urlencoded());

const teacherRoutes = require("./routes/teacherlogin")
const studentRoutes = require("./routes/studentlogin")
app.use("/teacher",teacherRoutes)
app.use("/student",studentRoutes)

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
