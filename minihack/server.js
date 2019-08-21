const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const GameModel = require('./games.model');
const path = require('path');

mongoose.connect(`mongodb://localhost:27017/minihack`, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connect mongodb success ...');
    const app = express();

    // middlewares
    app.use(express.static('public'));
    app.use(bodyParser.json());

    // static route
    app.get('/', (_req, res) => {
      res.sendFile(path.resolve(__dirname, './public/html/index.html'));
    });
    app.get('/games/:gameId', (_req, res) => {
      res.sendFile(path.resolve(__dirname, './public/html/game-detail.html'));
    });

    // json routes
    app.post('/create-game', (req, res) => {
      const users = req.body.users;

      GameModel.create({
        users: users,
        scrores: [],
      }, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          res.status(201).json({
            success: true,
            data: data,
          });
        }
      });
    });
    app.get('/get-game-by-id', (req, res) => {
      const gameId = req.query.id;

      GameModel.findById(gameId, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          res.status(200).json({
            success: true,
            data: data,
          });
        }
      });
    });
    app.put('/update-score', (req, res) => {
      // scores.0.1, scores.2.3
      const scorePosition = `scores.${req.body.round}.${req.body.player}`
      GameModel.findByIdAndUpdate(req.body.gameId, {$set: {
        [scorePosition]: Number(req.body.value),
      }}, (err) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message
          });
        } else {
          res.status(201).json({
            success: true,
          });
        }
      });
    });
    app.put('/add-round', (req, res) => {
      GameModel.findByIdAndUpdate(req.body.gameId, {$push: {
        scores: [0, 0, 0, 0],
      }}, (err) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message
          });
        } else {
          res.status(201).json({
            success: true,
          });
        }
      });
    });

    // start server
    app.listen(3000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server listen on port 3000 ...`);
      }
    });
  }
});