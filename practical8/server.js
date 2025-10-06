import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Required for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const COUNT_FILE = path.join(__dirname, 'count.json');

// Ensure count.json exists
if (!fs.existsSync(COUNT_FILE)) {
  fs.writeFileSync(COUNT_FILE, JSON.stringify({ count: 0 }));
}

// Function to read current count
function getCount() {
  const data = fs.readFileSync(COUNT_FILE);
  return JSON.parse(data).count;
}

// Function to write updated count
function saveCount(count) {
  fs.writeFileSync(COUNT_FILE, JSON.stringify({ count }));
}

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Serve HTML
    fs.readFile(path.join(__dirname, 'public/index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }

  else if (req.url === '/api/count' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count: getCount() }));
  }

  else if (req.url === '/api/count' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { action } = JSON.parse(body);
        let count = getCount();

        if (action === 'increment') count++;
        else if (action === 'decrement') count = Math.max(0, count - 1);
        else if (action === 'reset') count = 0;

        saveCount(count);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ count }));
      } catch (e) {
        res.writeHead(400);
        res.end('Bad Request');
      }
    });
  }

  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
