const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  // [player1, player2, player3, player4]
  users: [{
    type: String,
  }],
  // [
  //   [1, 2, 4, 5],
  //   [1, 2, 4, 5],
  //   [1, 2, 4, 5],
  //   [1, 2, 4, 5],
  // ]
  scores: [[{
    type: Number,
  }]]
});
const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;