import React from 'react';

function ResetButton(props) {
  return (
    <button className="reset-button" onClick={props.onClick}>
      Reset Game
    </button>
  );
}

export default ResetButton;
