// index.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const typeDefs = `#graphql
  type Doctor {
    id: ID!
    username: String!
    created_at: String!
  }

  type Query {
    doctors: [Doctor]
  }
`;

const resolvers = {
  Query: {
    doctors: async () => {
      const res = await pool.query('SELECT * FROM doctors');
      return res.rows;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);