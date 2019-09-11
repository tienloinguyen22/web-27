const express = require('express');
const joi = require('@hapi/joi');
const PostsModel = require('./posts.model');

const postsRouter = express.Router();

postsRouter.post('/create-post', async (req, res) => {
  // check login
  if (!req.session.currentUser || !req.session.currentUser.email) {
    res.status(403).json({
      success: false,
      message: 'Forbidden',
    });
  } else {
    // validate
    const postValidateSchema = joi.object().keys({
      imageUrl: joi.string().required(),
      content: joi.string().required(),
    });
    const validateResult = joi.validate(req.body, postValidateSchema);
    if (validateResult.error) {
      const error = validateResult.error.details[0];
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      try {
        // create new post
        const newpost = await PostsModel.create({
          imageUrl: req.body.imageUrl,
          content: req.body.content,
          author: req.session.currentUser._id,
        });

        res.status(201).json({
          success: true,
          data: newpost,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        })
      }
    }
  }
});

postsRouter.get('/:postId', async (req, res) => {
  try {
    const post = await PostsModel.findById(req.params.postId)
      .populate('author', '_id email fullName avatarUrl')
      .lean();
    res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
});

module.exports = postsRouter;
