import postgres from "postgres";
import { Book } from "./validaciones";

const connectionString =
  "postgresql://postgres.hbninqtzxwmjeyfgccjr:Pollito14@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
const sql = postgres(connectionString);

export async function addBook(book: Book) {
  await sql`
    INSERT INTO post (title, description, author)
    VALUES (${book.title}, ${book.description}, ${book.author})
  `;
  return book;
}
