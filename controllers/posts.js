// controllers/posts.js
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email');
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch posts', details: err.message });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch post', details: err.message });
  }
};

// Create a new post (protected)
exports.createPost = [
  authenticate,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ success: false, error: 'Title and content are required' });
      }

      const newPost = new Post({ title, content, author: req.user.id });
      await newPost.save();

      res.status(201).json({ success: true, message: 'Post created successfully', data: newPost });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to create post', details: err.message });
    }
  }
];

// Update post by ID (protected)
exports.updatePost = [
  authenticate,
  async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
      res.status(200).json({ success: true, message: 'Post updated successfully', data: post });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to update post', details: err.message });
    }
  }
];

// Delete post by ID (protected)
exports.deletePost = [
  authenticate,
  async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
      res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to delete post', details: err.message });
    }
  }
];
