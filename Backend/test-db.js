// test-db.js
import sql from './config/db.js';

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("✅ Connected to Supabase DB at:", result[0].now);
  } catch (error) {
    console.error("❌ Connection failed:", error);
  } finally {
    await sql.end(); // gracefully close connection
  }
}

testConnection();