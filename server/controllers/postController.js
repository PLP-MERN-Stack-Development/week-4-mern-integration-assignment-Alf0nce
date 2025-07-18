const Post = require('../models/Post');
const { validationResult } = require('express-validator');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author categories').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author categories comments.author');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newPost = new Post({
      ...req.body,
      author: req.user.id
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// Similar implementations for updatePost and deletePost