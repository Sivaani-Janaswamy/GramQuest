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

// Update a post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Only the owner can edit
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }

    const { title, body } = req.body;
    if (!title.trim() || !body.trim()) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    post.title = title;
    post.body = body;

    await post.save();
    res.json({ message: 'Post updated successfully', post });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  console.log('Post ID:', req.params.id);
      //Log req.user._id
    console.log('User ID:', req.user._id);
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id// Ensure user can only delete their own posts
      //Log req.params.id
      //Log req.user._id
    });
    console.log('Post ID:', req.params.id);
      //Log req.user._id
    console.log('User ID:', req.user._id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    // Optionally delete attachments
    if (post.attachments?.length) {
      post.attachments.forEach(file => {
        fs.unlinkSync(`./uploads/${file.filename}`);
      });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  starPost,
  upvotePost,
  replyToPost,
  updatePost,
  deletePost
};
