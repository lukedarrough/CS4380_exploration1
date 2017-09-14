import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
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
        const winner = checkGameOver(squares);
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

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = getStatusMessage(this.state.gameOver, this.state.winner, this.state.xIsNext);

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div className="board-row">
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
        </div>
        <div className="board-row">
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
        </div>
        <div className="board-row">
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
        </div>
        <div className="board-row">
          {this.renderSquare(48)}
          {this.renderSquare(49)}
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
        </div>
        <div className="board-row">
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function checkGameOver(squares) {
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

function getStatusMessage(gameOver, winner, xIsNext) {
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
