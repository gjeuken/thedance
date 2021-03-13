import { TheDance } from './Game';
import { TheDanceBoard } from './Board';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

const TheDanceClient = Client({
	game: TheDance,
	board: TheDanceBoard,
	//multiplayer: SocketIO({ server: `https://${window.location.hostname}` }),     // TODO for online use
	multiplayer: SocketIO({ server: 'localhost:8000' }),                            // TODO for local use
});

export default TheDanceClient;
