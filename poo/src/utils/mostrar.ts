import postgres from "postgres";
import { Book } from "./validaciones";

const connectionString =
  "postgresql://postgres.hbninqtzxwmjeyfgccjr:Pollito14@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
const sql = postgres(connectionString);

export async function getAllBooks() {
  const rows = await sql`SELECT id, title, description, author FROM post`;
  return rows.map((row: any) => ({
    id: row.id,
    ...Book.create(row.title, row.description, row.author),
  }));
}
