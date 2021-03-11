// from boardgame.io guide for Deployment to Heroku of Frontend and Backend
import { Server, FlatFile } from "boardgame.io/server";
import { Game } from "./src/Game/Game";
import { nanoid, customAlphabet } from "nanoid";
import path from "path";
import serve from "koa-static";
import { DEFAULT_PORT } from "./src/config";

const server = Server({
  games: [Game],
  db: new FlatFile({ dir: "db", logging: false, ttl: 1000 * 60 * 60 }),
});

const PORT = process.env.PORT || DEFAULT_PORT;

// build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, "./build");
server.app.use(serve(frontEndAppBuildPath));

// server.run(PORT, () => {
//   server.app.use(
//     async (ctx, next) => await serve(frontEndAppBuildPath)(Object.assign(ctx, { path: "index.html" }), next)
//   );
// });

server.run({
  port: PORT,
  callback: () => {
    server.app.use(
      async (ctx, next) => await serve(frontEndAppBuildPath)(Object.assign(ctx, { path: "index.html" }), next)
    );
  },
  lobbyConfig: {
    uuid: customAlphabet("ABCDEFGHJKMNOPQRSTUVWXYZ0123456789", 6),
  },
});
