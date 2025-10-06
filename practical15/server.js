const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

// --- Settings ---
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --- Session setup ---
app.use(
  session({
    secret: "libraryPortalSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 min
  })
);

// --- Middleware to protect profile page ---
function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

// --- Routes ---

app.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.render("login", { error: "Please enter your name" });
  }

  // Create session
  req.session.user = {
    name: name.trim(),
    loginTime: new Date().toLocaleString()
  };
  res.redirect("/profile");
});

app.get("/profile", authMiddleware, (req, res) => {
  res.render("profile", { user: req.session.user });
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send("Error logging out");
    }
    res.redirect("/");
  });
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
