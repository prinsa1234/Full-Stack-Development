// app.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Log Viewer</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #74ebd5, #ACB6E5);
            text-align: center;
            padding: 50px;
            color: #333;
          }
          h1 {
            color: #222;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: 0.3s;
          }
          a:hover {
            background: #0056b3;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to the Log Viewer 🚀</h1>
        <p>Click below to view the application logs.</p>
        <a href="/logs">View Logs</a>
      </body>
    </html>
  `);
});

// Logs route
app.get("/logs", (req, res) => {
  const logFile = path.join(__dirname, "text.log"); // example file

  fs.readFile(logFile, "utf8", (err, data) => {
    if (err) {
      return res.send(`
        <html>
          <head>
            <title>Error</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f8d7da;
                color: #721c24;
                padding: 50px;
                text-align: center;
              }
              .error-box {
                background: #f5c6cb;
                padding: 20px;
                border-radius: 10px;
                display: inline-block;
              }
            </style>
          </head>
          <body>
            <div class="error-box">
              <h2>⚠️ Error loading logs</h2>
              <p>${err.message}</p>
            </div>
          </body>
        </html>
      `);
    }

    res.send(`
      <html>
        <head>
          <title>Application Logs</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f4f4f9;
              text-align: center;
              padding: 40px;
            }
            h1 {
              color: #333;
              margin-bottom: 20px;
            }
            pre {
              background-color: lightblue;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 10px;
              white-space: pre-wrap;
              word-wrap: break-word;
              max-width: 800px;
              margin: auto;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
              text-align: left;
            }
            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background: #007BFF;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: 0.3s;
            }
            a:hover {
              background: #0056b3;
            }
          </style>
        </head>
        <body>
          <h1>📄 Application Logs</h1>
          <pre>${data}</pre>
          <a href="/">⬅ Back to Home</a>
        </body>
      </html>
    `);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
