import React, { Component } from 'react';
import Square from './Square.js';
import ResetButton from './ResetButton.js';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(64).fill(null),
      xIsNext: true,
      gameOver: false,
      winner: null,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] != null || this.state.gameOver) return;

    const i_modified = i % 8;

    //check for column
    for (var j = 56; j >= 0; j-=8) {
      if (squares[j + i_modified] == null) {
        squares[j + i_modified] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
        const winner = this.checkGameOver(squares);
        if (winner != null) {
          this.setState({
            gameOver: true,
            winner: winner,
          });
        }
        return;
      }
    }

    
  }

  checkGameOver(squares) {
    //check the horizontals
    for (var i = 0; i < 64; i+=8) {
      for (var j = 0; j <= 4; j++) {
        //check for X victory
        if (squares[i + j] === 'X' && squares[i + j + 1] === 'X' && squares[i + j + 2] === 'X' && squares[i + j + 3] === 'X')
          return 'X';
        //check for O victory
        if (squares[i + j] === 'O' && squares[i + j + 1] === 'O' && squares[i + j + 2] === 'O' && squares[i + j + 3] === 'O')
          return 'O';
      }
    }

    //check the vertical
    for (i = 0; i < 8; i++) {
      for (j = 0; j <= 32; j+=8) {
        //check for X victory
        if (squares[i + j] === 'X' && squares[i + j + 8] === 'X' && squares[i + j + 16] === 'X' && squares[i + j + 24] === 'X')
          return 'X';
        //check for O victory
        if (squares[i + j] === 'O' && squares[i + j + 8] === 'O' && squares[i + j + 16] === 'O' && squares[i + j + 24] === 'O')
          return 'O';
      }
    }

    //diagonal top left to bottom right
    for (i = 0; i <= 32; i+=8) {
      for (j = 0; j <= 4; j++) {
        //check for X victory
        if (squares[i + j] === 'X' && squares[i + j + 9] === 'X' && squares[i + j + 18] === 'X' && squares[i + j + 27] === 'X')
          return 'X';
        //check for O victory
        if (squares[i + j] === 'O' && squares[i + j + 9] === 'O' && squares[i + j + 18] === 'O' && squares[i + j + 27] === 'O')
          return 'O';
      }
    }

    //diagonal top right to bottom left
    for (i = 24; i <= 56; i+=8) {
      for (j = 0; j <= 4; j++) {
        //check for X victory
        if (squares[i + j] === 'X' && squares[i + j - 7] === 'X' && squares[i + j - 14] === 'X' && squares[i + j - 21] === 'X')
          return 'X';
        //check for O victory
        if (squares[i + j] === 'O' && squares[i + j - 7] === 'O' && squares[i + j - 14] === 'O' && squares[i + j - 21] === 'O')
          return 'O';
      }
    }

    return null;
  }

  getStatusMessage(gameOver, winner, xIsNext) {
    if (gameOver) {
      return "Game over, " + winner + " has won";
    } else {
      if (xIsNext) {
        return "X is up next";
      } else {
        return "O is up next";
      }
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderResetButton() {
    if(this.state.gameOver) {
      return (
        <ResetButton 
          onClick={() => this.resetGame()}
        />
      );
    }
  }

  resetGame() {
    this.setState({
      squares: Array(64).fill(null),
      xIsNext: true,
      gameOver: false,
      winner: null,
    });
  }

  createRow(start) {
    var row = [];
    for (var i = start; i < start + 8; i++) {
      row.push(this.renderSquare(i));
    }
    return row;
  }

  render() {
    const status = this.getStatusMessage(this.state.gameOver, this.state.winner, this.state.xIsNext);

    return (
      <div className="board-contents">
        <div><p className="status">{status}</p></div>
        <div className="board-container">
          <div className="board-row">
            {this.createRow(0)}
          </div>
          <div className="board-row">
            {this.createRow(8)}
          </div>
          <div className="board-row">
            {this.createRow(16)}
          </div>
          <div className="board-row">
            {this.createRow(24)}
          </div>
          <div className="board-row">
            {this.createRow(32)}
          </div>
          <div className="board-row">
            {this.createRow(40)}
          </div>
          <div className="board-row">
            {this.createRow(48)}
          </div>
          <div className="board-row">
            {this.createRow(56)}
          </div>
        </div>
        {this.renderResetButton()}
      </div>
    );
  }


}

export default Board;