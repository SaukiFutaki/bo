import Hapi, { Server, ServerRoute } from "@hapi/hapi";
import routes from "./routes";

(async (): Promise<void> => {
  const server: Server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes as ServerRoute[]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
})();
