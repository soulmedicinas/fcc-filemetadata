// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// HTML form for file upload
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`File Metadata Microservice listening at http://localhost:${port}`);
});