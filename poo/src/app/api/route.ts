import { NextResponse, NextRequest } from "next/server";
import { Book } from "@/utils/validaciones";
import { getAllBooks } from "@/utils/mostrar";
import { addBook } from "@/utils/insertar";
import { updateBook } from "@/utils/actualizar";
import { deleteBook } from "@/utils/eliminar";

// GET -> Mostrar libros
export async function GET() {
  try {
    const requisitos = await getAllBooks();
    return NextResponse.json({ message: "Libros obtenidos correctamente", requisitos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST -> Insertar libro
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, author } = body;

    if (!title || !description || !author) {
      return NextResponse.json({ error: "Por favor llena todos los campos" }, { status: 422 });
    }

    const book = Book.create(title, description, author);
    await addBook(book);

    return NextResponse.json({ message: "Libro agregado correctamente", nuevoPost: book });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT -> Actualizar libro
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, author } = body;

    if (!id || !title || !description || !author) {
      return NextResponse.json({ error: "Por favor envía id, título, descripción y autor" }, { status: 422 });
    }

    const book = Book.create(title, description, author);
    await updateBook(Number(id), book);

    return NextResponse.json({ message: "Libro actualizado correctamente", libroActualizado: book });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Por favor envía el id del libro a eliminar" }, { status: 422 });
    }

    await deleteBook(Number(id));

    return NextResponse.json({ message: "Libro eliminado correctamente", idEliminado: id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
