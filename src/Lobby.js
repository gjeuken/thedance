import React from 'react';
import { TheDance } from "./Game"
import { TheDanceBoard } from "./Board"
import { Lobby } from 'boardgame.io/react';

const server = `https://${window.location.hostname}`

export class TheDanceLobby extends React.Component {
	render() {
		return(
			<Lobby
			gameServer={server}
			lobbyServer={server}
			gameComponents={[ 
				{ game: TheDance, board: TheDanceBoard }
			]}
			/>)
	}
}

