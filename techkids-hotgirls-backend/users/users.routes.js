const express = require('express');
const bcryptjs = require('bcryptjs');
const UsersModel = require('./users.model');

const usersRouter = express.Router();
const emailRegex =  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// /users/register
usersRouter.post('/register', async (req, res) => {
  try {
    if (!emailRegex.test(req.body.email)) {
      // validate email
      res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    } else if (req.body.password.length < 6) {
      // validate password
      res.status(400).json({
        success: false,
        message: 'Password must be more than 6 characters',
      });
    } else {
      // email exist ?
      const data = await UsersModel.findOne({email: req.body.email}).lean();
      if (data) {
        res.status(400).json({
          success: false,
          message: 'Email has been used'
        });
      } else {
        // hash pw
        const hasPassword = bcryptjs.hashSync(req.body.password, 10);

        // create user record
        const newUser = await UsersModel.create({
          email: req.body.email,
          password: hasPassword,
          fullName: req.body.fullName,
        });

        res.status(201).json({
          success: true,
          data: newUser,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

usersRouter.post('/login', async (req, res) => {
  try {
    const user = await UsersModel.findOne({email: req.body.email}).lean();
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    } else if (!bcryptjs.compareSync(req.body.password, user.password)) {
      res.status(400).json({
        success: false,
        message: 'Wrong password'
      });
    } else {
      // {}
      req.session.currentUser = {
        _id: user._id,
        email: user.email
      };

      res.status(200).json({
        success: true,
        message: 'Login success',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

usersRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({
    success: true,
    message: 'Log out success',
  });
});

usersRouter.get('/test', (req, res) => {
  console.log(req.session.currentUser);
  res.json({
    success: true,
  });
});

module.exports = usersRouter;