import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET() {
  try {
    const connectionString =
      "postgresql://postgres.hbninqtzxwmjeyfgccjr:Pollito14@aws-1-us-east-2.pooler.supabase.com:6543/postgres";

    const sql = postgres(connectionString);

    const title = await sql`SELECT title FROM post`;
    const description = await sql`SELECT description FROM post`;
    const author = await sql`SELECT author FROM post`;

    return NextResponse.json({
      message: "Posts obtenidos correctamente",
      title,
      description,
      author
    });
  } catch (error: any) {
    console.error("Error al obtener posts:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "No se pudieron obtener los posts" },
      { status: 500 }
    );
  }
}
