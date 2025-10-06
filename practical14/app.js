const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

// ---- Settings ----
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ---- Multer Configuration ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // upload folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter: allow only PDFs
function fileFilter(req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'));
  }
}

// Limit file size to 2MB
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
}).single('resume');

// ---- Routes ----
app.get('/', (req, res) => {
  res.render('index', { message: null, error: null });
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).render('index', { error: 'File too large! Max size is 2 MB.', message: null });
      }
      return res.status(400).render('index', { error: 'Upload error: ' + err.message, message: null });
    } else if (err) {
      return res.status(400).render('index', { error: err.message, message: null });
    }
    if (!req.file) {
      return res.status(400).render('index', { error: 'Please select a PDF file.', message: null });
    }

    // Success
    res.render('result', { filename: req.file.filename });
  });
});

// ---- Start Server ----
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
