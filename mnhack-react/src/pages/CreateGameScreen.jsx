import React, { Component } from 'react';

class CreateGameScreen extends Component {
  state = {
    player1: '',
    player2: '',
    player3: '',
    player4: '',
  };

  handlePlayNamechange = (playerNumber, value) => {
    const player = `player${playerNumber}`;
    this.setState({
      [player]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    // fetch => CORS
  };

  render() {
    return (
      <div className="container mt-5">
        <h2>Score keeper</h2>

        <form className='mt-4 create-game-form' onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control player1"
              placeholder="Enter player name"
              value={this.state.player1}
              onChange={(event) => {
                this.handlePlayNamechange(1, event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              className="form-control player2"
              placeholder="Enter player name"
              value={this.state.player2}
              onChange={(event) => {
                this.handlePlayNamechange(2, event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control player3"
              placeholder="Enter player name"
              value={this.state.player3}
              onChange={(event) => {
                this.handlePlayNamechange(3, event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control player4"
              placeholder="Enter player name"
              value={this.state.player4}
              onChange={(event) => {
                this.handlePlayNamechange(4, event.target.value);
              }}
            />
          </div>

          <div className='error'></div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary submit"
              value='Create Game'
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateGameScreen;