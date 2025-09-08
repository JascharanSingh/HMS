import sql from "../db.js";

export const resolvers = {
  Query: {
    doctors: async () => {
      const result = await sql`SELECT * FROM doctors`;
      return result;
    },
  },
  Doctor: {
    name: (parent) => `${parent.first_name} ${parent.last_name}`,
  },
};