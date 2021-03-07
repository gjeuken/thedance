import React from 'react';
import { TheDance } from './Game';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';

const TheDanceClient = Client({
  game: TheDance,
  //board: TheDanceBoard,
  multiplayer: Local(),
});

const App = Client({ game: TheDance });
/*
const App = () => (
  <div>
    <TheDanceClient playerID="0" />
    <TheDanceClient playerID="1" />
  </div>
);
*/

export default App;