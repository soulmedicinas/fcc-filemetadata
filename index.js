const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

// Set up multer for file upload handling
const upload = multer({ storage: storage });

// Serve static files (for the HTML form)
app.use(express.static('public'));

// Route to handle file upload
app.post('/upload', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(fileMetadata); // Send back the file metadata as JSON
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
