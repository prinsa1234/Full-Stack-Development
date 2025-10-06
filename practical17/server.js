const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const Student = require("./models/Student");

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/tuitionDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  const { name, email, course, fees } = req.body;
  await Student.create({ name, email, course, fees });
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("edit", { student });
});

app.put("/edit/:id", async (req, res) => {
  const { name, email, course, fees } = req.body;
  await Student.findByIdAndUpdate(req.params.id, { name, email, course, fees });
  res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
