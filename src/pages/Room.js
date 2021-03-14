import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { GAME_SERVER_URL } from "../config";
import { TheDance } from "../Game";
import { TheDanceBoard } from "../Board";
import { LobbyAPI } from "../LobbyAPI";
import { NAME_TITLE } from "../constants"

import "./room.css";

const api = new LobbyAPI();

const GameClient = Client({
	game: TheDance,
	board: TheDanceBoard,
	debug: false,
	multiplayer: SocketIO({ server: GAME_SERVER_URL }),
});

const copyRoomToClipboard = (id) => {
	const text = window.location.origin + '/?joinRoom=' + id;
	// Create new element
	var el = document.createElement('textarea');
	// Set value (string to be copied)
	el.value = text;
	// Set non-editable to avoid focus and move outside of view
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};
	document.body.appendChild(el);
	// Select text inside element
	el.select();
	// Copy text to clipboard
	document.execCommand('copy');
	// Remove temporary element
	document.body.removeChild(el);
};



export const Room = (props) => {

	const { history } = props;
	const { id } = useParams();
	const [players, setPlayers] = useState([]);
	const [show, setShow] = useState(false);

	// check for newly joined players by comparing against the two players array (front-end and the api, and api is always slightly ahead)
	useEffect(() => {
		const interval = setInterval(() => {
			api.whosInRoom(id).then(
				(players) => {
					setPlayers(players);
					const currPlayers = players.filter((player) => player.name); // only current players have a name field
					if (currPlayers.length === players.length) {
						setShow(true); // everyone has joined, show them the board
					}
				},
				() => {
					history.push("", { invalidRoom: true }); // failed to join because room doesn't exist -> return user to homepage
				}
			);
		}, 500);
		if (show) {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [show, players.length, id, history]);

	const leaveRoom = () => {
		api.leaveRoom(id, localStorage.getItem("id"), localStorage.getItem("credentials")).then(() => {
			history.push("/");
		});
	};

	let playersList = []
	players.forEach(function (player) {
		let name = []
		if (player.name) {
			name = player.name + `${player.name === localStorage.getItem("name") ? " (you)" : ""}`;
		} else {
			name = "...";
		}
		playersList.push(<li>  {name}  </li>)
	})



	if (show) {
		return (
			<GameClient
			matchID={id}
			numPlayers={players.length}
			playerID={localStorage.getItem("id")}
			credentials={localStorage.getItem("credentials")}
			/>
		);
	} else {
		return (
			<div id = "outer_container">

			<span id="title">{NAME_TITLE}</span>

			<div id="room">

			<div id="room_info">

			<span className='semi_title'>Room</span>

			<div className="players-list">
			<ol>
			{playersList}
			</ol>

			</div>
			<div className="room-info-area">

			<div className="roomID-area">
			Room id: <b>{id}</b>
			<button className = 'copy-btn' onClick = {() => copyRoomToClipboard(id)}>Copy</button>
			</div>

			<p />

			<div className="room-info">
			Game will begin once all
			{players.length === 0 ? "" : ` ${players.length}`} players have joined.
			</div>

			<p />

			<button className="leave-btn" onClick={leaveRoom}>
			Leave
			</button>

			</div>
			</div>
			</div>
			</div>
		);
	}
};

// export default Room;
