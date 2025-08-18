import { NextResponse, NextRequest } from "next/server";
import postgres from "postgres";

const connectionString =
  "postgresql://postgres.hbninqtzxwmjeyfgccjr:Pollito14@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
const sql = postgres(connectionString);

export async function GET() {
  try {
    const requisitos = await sql`SELECT title, description, author FROM post`;  // Modificacion para que no se mire raro como mi anterio comitt

    return NextResponse.json({
      message: "Libros obtenidos correctamente",
      requisitos,
    });
  } catch (error: any) {
    console.error("Error al obtener libros:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "No se pudieron obtener los libros" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, author } = body;
  
    if (!title || !description || !author) {
      return NextResponse.json(
        { error: "Por favor llena todos los campos" },
        { status: 422 }
      );
    }
    await sql`
      INSERT INTO post (title, description, author)
      VALUES (${title}, ${description}, ${author})
    `;

    return NextResponse.json({
      message: "Libro agregado correctamente",
      nuevoPost: { title, description, author },
    });
  } catch (error: any) {
    console.error("Error al crear el libro:", error.message);
    return NextResponse.json(
      { error: "Ocurrio un problema al guardar tu libro" },
      { status: 500 }
    );
  }
}
