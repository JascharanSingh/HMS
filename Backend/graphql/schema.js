export const typeDefs = `#graphql
  type Doctor {
    id: ID!
    username: String!
    password: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    doctors: [Doctor]
  }
`;