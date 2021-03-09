import React from 'react';
import { TheDance } from './Game';
import { TheDanceBoard } from './Board';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

const TheDanceClient = Client({
	game: TheDance,
	board: TheDanceBoard,
	multiplayer: SocketIO({ server: `https://${window.location.hostname}` }),
});
/*
const App = () => (
  <div>
    <TheDanceClient playerID="0" />
    <TheDanceClient playerID="1" />
  </div>
);
*/

export default TheDanceClient;
