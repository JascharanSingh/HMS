// graphql/server.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import dotenv from 'dotenv';
dotenv.config();

// Import doctor schema & resolvers
import { typeDefs as doctorTypeDefs } from './doctor/schema.js';
import { resolvers as doctorResolvers } from './doctor/resolvers.js';

// Import patient schema & resolvers
import { typeDefs as patientTypeDefs } from './patient/schema.js';
import { resolvers as patientResolvers } from './patient/resolvers.js';

// Merge schemas
const typeDefs = mergeTypeDefs([doctorTypeDefs, patientTypeDefs]);
const resolvers = mergeResolvers([doctorResolvers, patientResolvers]);

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    console.error("GraphQL Error:", error);
    return formattedError;
  },
});

// Start server with CORS
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async ({ req, res }) => ({ req, res }),
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000", // ✅ frontend
    credentials: true,
  },
});

console.log(`🚀 GraphQL Server ready at ${url}`);