import React, { useState, useEffect } from "react";
import { LobbyAPI } from "../LobbyAPI";
import "./lobby.css";
import { MIN_PLAYERS, MAX_PLAYERS, NAME_TITLE } from "../constants"

const api = new LobbyAPI();

let initialName = ""
if (localStorage.getItem('name') !== null) {
	initialName = localStorage.getItem('name');
}

export const Lobby = (props) => {

	const { history } = props;

	const [num, setNum] = useState(2);
	const [errMsg, setErrMsg] = useState("");
	const [jName, setJName] = useState(initialName);
	const [cName, setCName] = useState(initialName);

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const roomID_from_params = urlParams.get('joinRoom');
	const [room, setRoom] = useState(roomID_from_params);

	// handle URL to a room that doesn't exist
	useEffect(() => {
		let timer;
		if (history.location.state && history.location.state.invalidRoom) {
			setErrMsg("room does not exist!");
			// reset error message
			timer = setTimeout(() => {
				setErrMsg("");
				history.replace();
			}, 4000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [history]);

	// restrict inputs, specifically spaces (inspired by https://secret-hitler.online/)
	const handleKeyDown = (e, text) => {
		if (e.key === " ") {
			if (text) {
				if (text.length === 0 || text.substring(text.length - 1, text.length) === " ") {
					e.preventDefault();
				}
			} else {
				e.preventDefault();
			}
		}
	};

	// store user information to localStorage to use later when we arrive at the room
	const saveInfo = (name, id, credentials) => {
		localStorage.setItem("name", name);
		localStorage.setItem("id", id);
		localStorage.setItem("credentials", credentials);
	};

	const joinRoom = async (roomID, name) => {
		try {
			const players = await api.whosInRoom(roomID);
			const uniqueName =
				players
				.filter((player) => player.name)
				.map((player) => player.name)
				.indexOf(name) === -1;
			if (uniqueName) {
				// find first empty seat
				const id = players.find((player) => !player.name).id;
				api.joinRoom(roomID, name, id).then((credentials) => {
					saveInfo(name, id, credentials);
					history.push("/rooms/" + roomID);
				});
			} else {
				// handle name conflict error
				setErrMsg("name already taken!");
				setJName("");
				document.getElementById("joinName").value = "";
			}
		} catch (err) {
			/*
			 * --- TO-DO: setErrMsg("room is full") here if that's the case. currently it's "room does not exist" in both cases ---
			 */
			setErrMsg("room does not exist!");
			setRoom("");
			document.getElementById("roomIdentification").value = "";
		}
	};

	const createRoom = () => {
		api.createRoom(num).then((roomID) => {
			joinRoom(roomID, cName);
		});
	};

	return (
		<div id = "outer_container">

		<span id="title">{NAME_TITLE}</span>

		<div id = "lobby">

		<div id="join_room" className='pane'>

		<span className = 'semi_title'>Join room</span>

		<p>Room ID:</p>
		<input
		id="roomIdentification"
		type="text"
		defaultValue = {room}
		spellCheck="false"
		autoComplete="off"
		onKeyDown={(e) => handleKeyDown(e)}
		onChange={(e) => setRoom(e.target.value)}
		className="input-field"
		/>

		<p>Your name:</p>
		<input
		id="joinName"
		type="text"
		defaultValue = {cName}
		spellCheck="false"
		autoComplete="off"
		onKeyDown={(e) => handleKeyDown(e, jName)}
		onChange={(e) => setJName(e.target.value)}
		onPaste={(e) => e.preventDefault()}
		className="input-field"
		/>

		<p />

		<button
		className="lobby-btn"
		disabled={jName.length === 0}
		onClick={() => joinRoom(room, jName) }
		>
		Join
		</button>

		</div>

		<div id="create_room" className='pane'>

		<span className='semi_title'>Create room</span>

		<p>Players: {num}</p>
		<input
		type="range"
		min = {`${MIN_PLAYERS}`}
		max = {`${MAX_PLAYERS}`}
		value={num}
		autoComplete="off"
		onChange={(e) => setNum(e.target.value)}
		className="input-slider"
		/>

		<p>Your name:</p>
		<input
		id="createName"
		type="text"
		defaultValue = {cName}
		spellCheck="false"
		autoComplete="off"
		onKeyDown={(e) => handleKeyDown(e, cName)}
		onChange={(e) => setCName(e.target.value)}
		onPaste={(e) => e.preventDefault()}
		className="input-field"
		/>

		<p />

		<button className="lobby-btn" disabled={cName.length === 0} onClick={createRoom}>
		Create
		</button>

		</div>
		</div>
		</div>

	)
}

// export default Lobby;
