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

postsRouter.get('/get/posts', async (req, res) => {
  // offset paging => pageNumber | pageSize => limit | skip
  const pageNumber = Number(req.query.pageNumber);
  const pageSize = Number(req.query.pageSize);
  const validateSchema = joi.object().keys({
    pageNumber: joi.number().min(1),
    pageSize: joi.number().min(1).max(50),
  });
  const validateResult = joi.validate({
    pageNumber: pageNumber,
    pageSize: pageSize,
  }, validateSchema);
  if (validateResult.error) {
    const error = validateResult.error.details[0];
    res.status(400).json({
      success: false,
      message: error.message,
    });
  } else {
    // get data
    const result = await PostsModel.find({})
      .populate('author', '_id fullName email')
      .sort({createdAt: -1, fullName: 1})
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();
    const total = await PostsModel.find({}).countDocuments();

    res.status(200).json({
      success: true,
      data: {
        data: result,
        total: total,
      },
    });
  }
});

module.exports = postsRouter;
