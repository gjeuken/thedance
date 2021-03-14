export const GAME_NAME = 'TheDance';

export const APP_PRODUCTION = process.env.NODE_ENV === "production";
export const GAME_SERVER_PORT = 8000;
const { origin, protocol, hostname } = window.location;
export const GAME_SERVER_URL = APP_PRODUCTION ? origin : `${protocol}//${hostname}:${GAME_SERVER_PORT}`;
