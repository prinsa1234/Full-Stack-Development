// routes/home.js
const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.send('<h1>Welcome to our site</h1>');
});

module.exports = router;
