import React from 'react';
import { TheDance } from "./Game"
import { TheDanceBoard } from "./Board"
import { Lobby } from 'boardgame.io/react';

export class TheDanceLobby extends React.Component {
	render() {
		return(
			<Lobby
			gameServer={`https://${window.location.hostname}:8000`}
			lobbyServer={`https://${window.location.hostname}:8000`}
			gameComponents={[ 
				{ game: TheDance, board: TheDanceBoard }
			]}
			/>)
	}
}

