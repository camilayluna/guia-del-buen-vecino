import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// 🔥 NO romper el server si falta la variable
if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL no está definida");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 🔥 CLAVE para Render
  },
});

// Podés usar con o sin schema
export const db = drizzle(pool);
// export const db = drizzle(pool, { schema });
