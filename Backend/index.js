// Backend/index.js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { serverConfig } from "./graphql/server.js"; // ✅ merged config here
import dotenv from "dotenv";

dotenv.config();

const server = new ApolloServer(serverConfig);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
