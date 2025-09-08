export const typeDefs = `#graphql
  type Doctor {
    id: ID!
    first_name: String!
    last_name: String!
    name: String!
  
    specialization: String!
    email: String!
    password: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    doctors: [Doctor]
  }
`;