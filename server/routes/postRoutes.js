const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const postController = require('../controllers/postController');

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.userId }; // Store user ID in req.user
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Create uploads folder if not exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir);
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, or PDF allowed.'));
    }
    cb(null, true);
  }
});

// Routes
router.post('/', verifyToken, upload.array('attachments'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/mine', verifyToken, postController.getMyPosts); 
router.put('/:id/star', verifyToken, postController.starPost); // Added verifyToken
router.put('/:id/upvote', verifyToken, postController.upvotePost); // Added verifyToken
router.post('/:id/reply', verifyToken, postController.replyToPost); // Added verifyToken

module.exports = router;
