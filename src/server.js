import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import http from "http";
import schema from "./schema";
import { getUser } from "./user/user.utils";

const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => {
      const {
        headers: { token },
      } = req;
      if (!token) return null;
      return { loggedInUser: await getUser(token) };
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer();
