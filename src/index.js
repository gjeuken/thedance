import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TheDanceClient from './App';
import reportWebVitals from './reportWebVitals';

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

import { render } from 'react-dom';
import { TheDance } from "./Game"
import { TheDanceBoard } from "./Board"

/*const TheDanceClient = Client({
	game: TheDance,
	board: TheDanceBoard,
	multiplayer: SocketIO({ server: 'localhost:8000' }),
});*/

class App1 extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <TheDanceClient playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App1 />, document.getElementById("root"));