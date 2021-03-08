const { Server } = require('boardgame.io/server');
const { TheDance } = require('./Game');

const server = Server({ games: [TheDance] });

server.run(8000);