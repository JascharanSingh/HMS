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

// Merge typeDefs and resolvers
const typeDefs = mergeTypeDefs([doctorTypeDefs, patientTypeDefs]);
const resolvers = mergeResolvers([doctorResolvers, patientResolvers]);

// Create Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Start server
const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
});

console.log(`🚀 GraphQL Server ready at ${url}`);
