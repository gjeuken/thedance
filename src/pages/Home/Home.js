import React, { useState, useEffect } from "react";
import Lobby from "../Lobby/Lobby";
import { api } from "../../LobbyAPI";
import "./Home.scss";
import { MIN_PLAYERS, MAX_PLAYERS } from "../../constants"

const Home = (props) => {
  const { history } = props;
  const maxNameLength = 12;
  const roomIDLength = 6;

  const [room, setRoom] = useState("");
  const [jName, setJName] = useState("");
  const jNameCount = maxNameLength - jName.length;
  const [num, setNum] = useState(2);
  const [cName, setCName] = useState("");
  const cNameCount = maxNameLength - cName.length;
  const [errMsg, setErrMsg] = useState("");

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
      const players = await api.getPlayers(roomID);
      const uniqueName =
        players
          .filter((player) => player.name)
          .map((player) => player.name)
          .indexOf(name) === -1;
      if (uniqueName) {
        // find first empty seat
        const id = players.find((player) => !player.name).id;
        api.joinRoom(roomID, id, name).then((credentials) => {
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
    <Lobby>
      <span className="title join-title">join game</span>
      <div className="input-info-area">
        <p style={{ margin: "0" }}>room id</p>
      </div>
      <input
        id="roomIdentification"
        type="text"
        maxLength={`${roomIDLength}`}
        spellCheck="false"
        autoComplete="off"
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => setRoom(e.target.value)}
        className="input-field"
      />
      <div className="input-info-area">
        <p style={{ margin: "0" }}>your name</p>
        <p style={{ margin: "0 0 0 auto" }}>{jNameCount}</p>
      </div>
      <div className="user-input">
        <input
          id="joinName"
          type="text"
          maxLength={`${maxNameLength}`}
          spellCheck="false"
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e, jName)}
          onChange={(e) => setJName(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          className="input-field"
        />
      </div>
      <button
        className="lobby-btn"
        disabled={room.length !== roomIDLength || jName.length === 0}
        onClick={() => joinRoom(room, jName)}
      >
        join
      </button>
      <div className="error-msg">{errMsg}</div>
      <span className="title create-title">create lobby</span>
      <div className="input-info-area">
        <p style={{ margin: "0" }}># players: {num}</p>
      </div>
      <input
        type="range"
        min = {`${MIN_PLAYERS}`}
        max = {`${MAX_PLAYERS}`}
        value={num}
        autoComplete="off"
        onChange={(e) => setNum(e.target.value)}
        className="input-slider"
      />
      <div className="input-info-area">
        <p style={{ margin: "0" }}>your name</p>
        <p style={{ margin: "0 0 0 auto" }}>{cNameCount}</p>
      </div>
      <div className="user-input">
        <input
          type="text"
          maxLength={`${maxNameLength}`}
          spellCheck="false"
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e, cName)}
          onChange={(e) => setCName(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          className="input-field"
        />
      </div>
      <button className="lobby-btn" disabled={cName.length === 0} onClick={createRoom}>
        create
      </button>
    </Lobby>
  );
};

export default Home;
