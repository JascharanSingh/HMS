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
    updatePatient: async (_, { id, medical_history }) => {
      try {
        const result = await sql`
          UPDATE patients
          SET medical_history = ${sql.json(medical_history)},
              updated_at = NOW()
          WHERE id = ${id}
          RETURNING *;
        `;
        return result[0];
      } catch (error) {
        console.error("Error updating patient:", error);
        throw new Error("Failed to update patient");
      }
    },
  },

  Patient: {
    medical_history: (parent) => {
      if (!parent.medical_history) return null;
      return parent.medical_history;
    },
  },
};
