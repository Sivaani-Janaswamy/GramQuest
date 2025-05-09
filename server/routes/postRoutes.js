const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup to handle file uploads with custom storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, or PDF allowed.'));
    }
    cb(null, true);
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);  // Log the decoded JWT

    // Set the userId to req.user._id
    req.user = { _id: decoded.userId };  // This ensures that req.user._id is available

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// Create a new post (Authenticated)
router.post('/', verifyToken, upload.array('attachments'), async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user._id;
    console.log('UserId:', userId); 

    if (!title.trim() || !body.trim()) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    
    // Fetch the user from the database
    const user = await User.findById(userId);
    console.log('User from DB:', user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Handle file upload and create file URLs
    const attachments = req.files?.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`) || [];

    const post = new Post({
      title,
      body,
      attachments,
      user: user._id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
// Get all posts
router.get('/', async (req, res) => {
  console.log('GET /api/posts');
  try {
    const posts = await Post.find().populate('user', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Star a post
router.put('/:id/star', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { userId } = req.body;
    if (!post.stars.includes(userId)) {
      post.stars.push(userId);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upvote a post
router.put('/:id/upvote', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { userId } = req.body;
    if (!post.upvotes.includes(userId)) {
      post.upvotes.push(userId);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reply to a post
router.post('/:id/reply', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { userId, comment } = req.body;
    post.replies.push({ user: userId, comment });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
