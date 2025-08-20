import postgres from "postgres";

const connectionString =
  "postgresql://postgres.hbninqtzxwmjeyfgccjr:Pollito14@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
const sql = postgres(connectionString);

export async function deleteBook(id: number) {
  const result = await sql`
    DELETE FROM post
    WHERE id = ${id}
    RETURNING id
  `;
  if (result.count === 0) {
    throw new Error("No se encontró el libro a eliminar.");
  }
  return { id };
}
