import postgres from "postgres";
import { Book } from "./validaciones";

const connectionString =
  "postgresql://postgres.hbninqtzxwmjeyfgccjr:Pollito14@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
const sql = postgres(connectionString);

export async function updateBook(id: number, book: Book) {
  const result = await sql`
    UPDATE post
    SET title = ${book.title},
        description = ${book.description},
        author = ${book.author}
    WHERE id = ${id}
    RETURNING id
  `;
  if (result.count === 0) {
    throw new Error("No se encontró el libro a actualizar.");
  }
  return book;
}
