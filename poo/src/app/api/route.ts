import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulamos datos para ver que este vien la validacion
    const posts = [
      {
        title: "Pureba 2",
        description: "Este es un post de prueba",
        author: "Yo"
      },
    ];

    return NextResponse.json({
      message: "Posts obtenidos correctamente",
      posts
    });
  } catch (error: any) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "No se pudieron obtener los usuarios" },
      { status: 500 }
    );
  }
}
