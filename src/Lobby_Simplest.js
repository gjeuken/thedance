import React from 'react';
import TheDanceClient from './App';

export class SimpleLobby extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}> Player 0 </button>
          <button onClick={() => this.setState({ playerID: "1" })}> Player 1 </button>
        </div>
      );
    }
    return ( <div> <TheDanceClient playerID={this.state.playerID} /> </div> );
  }
}