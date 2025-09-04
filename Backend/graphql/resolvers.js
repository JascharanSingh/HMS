import sql from "../config/db.js";

export const resolvers = {
  Query: {
    doctors: async () => {
      const result = await sql`SELECT * FROM doctors`;
  
      return result;
    }
  }
  
};


