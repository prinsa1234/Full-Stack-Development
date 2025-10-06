const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { message: null, error: null });
});

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.render("index", { message: null, error: "⚠️ All fields are required." });
  }

  try {
    // Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // your email
      subject: `New Message from ${name}: ${subject}`,
      text: `You have a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.render("index", { message: "✅ Message sent successfully!", error: null });
  } catch (err) {
    console.error(err);
    res.render("index", { message: null, error: "❌ Failed to send message. Try again later." });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
