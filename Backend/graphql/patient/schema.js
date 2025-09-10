export const typeDefs = `#graphql
  scalar JSON

  type Patient {
    id: ID!
    first_name: String!
    last_name: String!
    dob: String
    medical_history: JSON
    created_at: String!
    updated_at: String!
    address: String
    gender: String
  }

  type Query {
    patients: [Patient]
  }

  type Mutation {
    updatePatientMedicalHistory(id: Int!, medical_history: JSON!): Patient
  }
`;