import React from 'react';
import { render } from 'react-dom';

import './index.css';

import { TheDanceLobby } from './Lobby';
import { SimpleLobby } from './Lobby_Simplest';

const isSimpleLobby = false;     // If true, uses the simple lobby. Otherwise, uses the Boardgame.io lobby.

if (isSimpleLobby) { render(<SimpleLobby />, document.getElementById("root")); }
else { render(<TheDanceLobby />, document.getElementById("root")); }