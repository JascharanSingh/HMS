import sql from "../db.js";

export const resolvers = {
  Query: {
    patients: async () => {
      try {
        const result = await sql`SELECT * FROM patients`;
        return result;
      } catch (error) {
        console.error("Error fetching patients:", error);
        throw new Error("Failed to fetch patients");
      }
    },
  },
  Mutation: {
    updatePatientMedicalHistory: async (_, { id, medical_history }) => {
      try {
        const result = await sql`
          UPDATE patients
          SET medical_history = ${medical_history}::jsonb
          WHERE id = ${id}
          RETURNING *;
        `;
        if (result.length === 0) {
          throw new Error(`Patient with id ${id} not found`);
        }
        return result[0];
      } catch (error) {
        console.error("Error updating patient:", error);
        throw new Error("Failed to update patient");
      }
    },
  },

  Patient: {
    // ensures Postgres JSONB maps correctly into GraphQL JSON scalar
    medical_history: (parent) => parent.medical_history,
  },
};