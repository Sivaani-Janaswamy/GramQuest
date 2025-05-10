const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user._id;

    if (!title.trim() || !body.trim()) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

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
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user');
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get posts created by the logged-in user
const getMyPosts = async (req, res) => {
  try {
    const myPosts = await Post.find({ user: req.user._id }).populate('user');
    res.json(myPosts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Star a post
const starPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID required for starring' });

    if (!post.stars.includes(userId)) {
      post.stars.push(userId);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error('Error starring post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Upvote a post
const upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'User ID required for upvoting' });

    if (!post.upvotes.includes(userId)) {
      post.upvotes.push(userId);
      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error('Error upvoting post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Reply to a post
const replyToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const { userId, comment } = req.body;
    if (!userId || !comment.trim()) {
      return res.status(400).json({ message: 'User ID and comment are required' });
    }

    post.replies.push({ user: userId, comment });

    await post.save();
    res.json(post);
  } catch (err) {
    console.error('Error replying to post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  starPost,
  upvotePost,
  replyToPost
};
