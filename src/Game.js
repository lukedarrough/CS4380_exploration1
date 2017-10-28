import React, { Component } from 'react';
import Board from './Board.js';
import Title from './Title.js';

class Game extends Component {

    render() {
    return (
      <div className="game">
      	<Title text="Luke Darrough's React Connect 4"/>
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game;
